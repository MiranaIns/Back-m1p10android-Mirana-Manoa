const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");

const LieuService = {
    listAllLieux
};

const db = Database.getInstance();
const collectionName = 'lieux';

async function listAllLieux(filters, page, pageSize) {
    try {
        const query = buildQueryFromFilters(filters);

        return db.then(async (db) => {
            const collection = db.collection(collectionName);

            const skip = (page - 1) * pageSize;
            const totalLieux = await collection.countDocuments(query);
            const lieux = await collection
                .find(query)
                .skip(skip)
                .limit(pageSize)
                .toArray();

            return {
                totalLieux,
                lieux
            };
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

function buildQueryFromFilters(filters) {
    const query = {};

    // Apply filters if provided
    if (filters.lieu_nom) {
        query.lieu_nom = { $regex: filters.lieu_nom, $options: 'i' };
    }
    
    return query;
}

module.exports = LieuService;
