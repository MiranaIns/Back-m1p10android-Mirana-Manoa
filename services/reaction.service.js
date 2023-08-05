const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");

const ReactionService = {
    createReaction,
    deleteReaction
};

const db = Database.getInstance();
const collectionName = 'reactions';
async function hasUserReacted(user, fk_publication_id) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const existingReaction = await collection.findOne({
                "fk_utilisateur_id": user._id,
                "fk_publication_id": ObjectId(fk_publication_id)
            });
            return existingReaction !== null;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function createReaction(user, fk_publication_id) {
    try {
        const userHasReacted = await hasUserReacted(user, fk_publication_id);
        if (userHasReacted) {
            throw new Error("User has already reacted to this publication");
        }

        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const reaction = {
                "fk_utilisateur_id": user._id,
                "fk_publication_id": ObjectId(fk_publication_id)
            };
            const insertResult = await collection.insertOne(reaction);
            return insertResult.insertedId;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function deleteReaction(user, fk_publication_id) {
    try {
        return db.then(async (db) => {
            const collection = db.collection('reactions');
            const deleteResult = await collection.deleteOne({
                "fk_utilisateur_id": user._id,
                "fk_publication_id": ObjectId(fk_publication_id)
            });
            return deleteResult.deletedCount;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

module.exports = ReactionService;
