const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");
const { v4 } = require("uuid");

const PublicationService = {
    create,
    findAllWithFilters
};

const db = Database.getInstance();
const collectionName = 'publications';

async function create(user, publicationData) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);

            // Vérification que fk_lieu_id existe dans la collection 'lieux'
            const lieuExists = await checkDocumentExists(db, 'lieux', publicationData.fk_lieu_id);
            if (!lieuExists) {
                throw new Error("Lieu n'existe pas");
            }

            // Vérification que fk_categorie_id existe dans la collection 'categories'
            const categorieExists = await checkDocumentExists(db, 'categories', publicationData.fk_categorie_id);
            if (!categorieExists) {
                throw new Error("Categorie n'existe pas");
            }

            const insertResult = await collection.insertOne(
                {
                    "publication_uuid": v4(),
                    "fk_user_id": user._id,
                    "fk_lieu_id": ObjectId(publicationData.fk_lieu_id),
                    "fk_categorie_id": ObjectId(publicationData.fk_categorie_id),
                    "publication_description": publicationData.publication_description,
                    "publication_image": publicationData.publication_image,
                    "date_publication": new Date()
                }
            );
            return insertResult.insertedId;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function checkDocumentExists(db, collectionName, documentId) {
    const collection = db.collection(collectionName);
    const document = await collection.findOne({ _id: ObjectId(documentId) });
    return !!document;
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
                .sort({ date_publication: -1 })
                .skip(skip)
                .limit(pageSize)
                .toArray();

            const publicationsWithDetails = await Promise.all(publications.map(async (publication) => {
                const lieuDetails = await getLieuDetails(db, publication.fk_lieu_id);
                const categorieDetails = await getCategorieDetails(db, publication.fk_categorie_id);
                const userDetails = await getUserDetails(db, publication.fk_user_id);

                return {
                    ...publication,
                    lieuDetails,
                    categorieDetails,
                    userDetails
                };
            }));

            return {
                totalPublications,
                publications: publicationsWithDetails
            };
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function getLieuDetails(db, lieuId) {
    const lieuCollection = db.collection('lieux');
    const lieuDetails = await lieuCollection.findOne({ _id: ObjectId(lieuId) });
    return lieuDetails;
}

async function getCategorieDetails(db, categorieId) {
    const categorieCollection = db.collection('categories');
    const categorieDetails = await categorieCollection.findOne({ _id: ObjectId(categorieId) });
    return categorieDetails;
}

async function getUserDetails(db, userId) {
    const utilisateurCollection = db.collection('utilisateur');
    const userDetails = await utilisateurCollection.findOne({ _id: ObjectId(userId) });
    return userDetails;
}

function buildQueryFromFilters(filters) {
    const query = {};

    if (filters.search) {
        query.publication_description = { $regex: filters.search, $options: 'i' };
    }

    if (filters.fk_categorie_id) {
        query.fk_categorie_id = ObjectId(filters.fk_categorie_id);
    }

    if (filters.fk_lieu_id) {
        query.fk_lieu_id = ObjectId(filters.fk_lieu_id);
    }

    return query;
}


module.exports = PublicationService;
