const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");

const CategorieService = {
    listAllCategories
};

const db = Database.getInstance();
const collectionName = 'categories';

async function listAllCategories() {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const categories = await collection.find().toArray();
            return categories;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

module.exports = CategorieService;
