const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");
const { v4 } = require("uuid");

const PublicationService = {
    findById,
    create,
    findAllWithFilters
};

const db = Database.getInstance();
const collectionName = 'publication';

async function findById(id) {
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return new Promise((resolve, reject) => {
                collection.findOne({ _id: ObjectId(id) }, (err, publication) => {
                    if (err) {
                        reject(err);
                    }
                    if (!publication) {
                        reject(new Error("Publication not found"));
                    }
                    resolve(publication);
                });
            });
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

function create(publicationData) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const insertResult = await collection.insertOne(
                {
                    publication_uuid: v4(),
                    ...publicationData
                }
            );
            return insertResult.insertedId;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function findAllWithFilters(filters, page, pageSize) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);

            const query = buildQueryFromFilters(filters);

            const skip = (page - 1) * pageSize;
            const totalPublications = await collection.countDocuments(query);
            const publications = await collection
                .find(query)
                .sort({ date_publication: -1 }) // Tri par date_publication décroissante
                .skip(skip)
                .limit(pageSize)
                .toArray();

            return {
                totalPublications,
                publications
            };
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

function buildQueryFromFilters(filters) {
    const query = {};

    if (filters.search) {
        query.description = { $regex: filters.search, $options: 'i' };
    }
    
    return query;
}

module.exports = PublicationService;
