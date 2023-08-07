const Database = require('../database');
const Constant = require("../utils/constant.util");
const { ObjectId } = require("mongodb");

const LieuService = {
    listAllLieux,
    getLieuById,
    getAbonnesCount,
    getNoteMoyenne
};

const db = Database.getInstance();
const collectionName = 'lieux';

async function listAllLieux(filters, page, pageSize, user) {
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

            const lieuxWithAdditionalInfo = await Promise.all(
                lieux.map(async (lieu) => {
                    const abonnes = await getAbonnesCount(db, lieu._id);
                    const note_moyenne = await getNoteMoyenne(db, lieu._id);
                    const isAbonne = await isUserAbonne(db, user, lieu._id);
                    return {
                        ...lieu,
                        abonnes,
                        note_moyenne,
                        isAbonne
                    };
                })
            );

            return {
                totalLieux,
                lieux: lieuxWithAdditionalInfo
            };
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function isUserAbonne(db, user, lieuId) {
    const abonnementsCollection = db.collection('abonnements');
    const abonnement = await abonnementsCollection.findOne({ fk_utilisateur_id: user._id, fk_lieu_id: lieuId });
    return !!abonnement;
}

async function getAbonnesCount(db, fk_lieu_id) {
    try {
        const collection = db.collection('abonnements');
        const count = await collection.countDocuments({ fk_lieu_id });
        return count;
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

async function getNoteMoyenne(db, fk_lieu_id) {
    try {
        const collection = db.collection('notes');
        const notes = await collection.find({ fk_lieu_id }).toArray();
        if (notes.length === 0) {
            return 0;
        }
        const totalNotes = notes.reduce((sum, note) => sum + note.note, 0);
        return totalNotes / notes.length;
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

async function getLieuById(lieuId, user) {
    try {
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const lieu = await collection.findOne({ _id: ObjectId(lieuId) });

            if (!lieu) {
                return null; // Le lieu n'a pas été trouvé
            }

            const abonnes = await getAbonnesCount(db, lieu._id);
            const note_moyenne = await getNoteMoyenne(db, lieu._id);
            const isAbonne = await isUserAbonne(db, user, lieu._id);

            return {
                ...lieu,
                abonnes,
                note_moyenne,
                isAbonne
            };
        });
    } catch (e) {
        throw { status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message };
    }
}

module.exports = LieuService;
