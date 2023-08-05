const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");

const NotesService = {
    rateLieu
};

const db = Database.getInstance();
const collectionName = 'notes';

async function hasUserRated(user, fk_lieu_id) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const existingRating = await collection.findOne({
                "fk_utilisateur_id": user._id,
                "fk_lieu_id": ObjectId(fk_lieu_id)
            });
            return existingRating !== null;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function rateLieu(user, fk_lieu_id, note) {
    try {
        const userHasRated = await hasUserRated(user, fk_lieu_id);
        if (userHasRated) {
            throw new Error("User has already rated this lieu");
        }

        if (note < 1 || note > 6) {
            throw new Error("Invalid rating. Rating must be between 1 and 5");
        }

        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const rating = {
                "fk_utilisateur_id": user._id,
                "fk_lieu_id": ObjectId(fk_lieu_id),
                "note": note
            };
            const insertResult = await collection.insertOne(rating);
            return insertResult.insertedId;
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

module.exports = NotesService;
