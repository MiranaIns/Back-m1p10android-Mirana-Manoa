const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");

const AbonnementService = {
    subscribeToLieu,
    unsubscribeFromLieu
};

const db = Database.getInstance();
const collectionName = 'abonnements';

async function isUserSubscribed(user, fk_lieu_id) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const existingSubscription = await collection.findOne({
                "fk_utilisateur_id": user._id,
                "fk_lieu_id": ObjectId(fk_lieu_id)
            });
            return existingSubscription !== null;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function subscribeToLieu(user, fk_lieu_id) {
    try {
        const userIsSubscribed = await isUserSubscribed(user, fk_lieu_id);
        if (userIsSubscribed) {
            throw new Error("User is already subscribed to this lieu");
        }

        return db.then(async (db) => {
            const collection = db.collection('abonnements');
            const subscription = {
                "fk_utilisateur_id": user._id,
                "fk_lieu_id": ObjectId(fk_lieu_id)
            };
            const insertResult = await collection.insertOne(subscription);
            return insertResult.insertedId;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function unsubscribeFromLieu(user, fk_lieu_id) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const deleteResult = await collection.deleteOne({
                "fk_utilisateur_id": user._id,
                "fk_lieu_id": ObjectId(fk_lieu_id)
            });
            return deleteResult.deletedCount;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

module.exports = AbonnementService;
