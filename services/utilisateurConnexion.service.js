const Database = require('../database');
const Constant = require("../utils/constant.util");
const bcrypt = require("bcrypt");

const UtilisateurConnexionService = {
    findUtilisateurConnexionByEmail,
    findUtilisateurByUtilisateurConnexionId,
    create
};

const db = Database.getInstance();

const collectionName = 'utilisateur_connexion';

async function findUtilisateurConnexionByEmail(mail){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return new Promise((resolve, reject) => {
                collection.findOne({utilisateur_connexion_mail: mail}, (err, utilisateurConnexion) => {
                    if (err) {
                        reject(err);
                    }
                    if (!utilisateurConnexion) {
                        resolve(null);
                    }
                    resolve(utilisateurConnexion);
                });
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

async function findUtilisateurByUtilisateurConnexionId(idUtilisateurConnection){
    try {
        return db.then((db) => {
            const collection = db.collection("utilisateur");
            return new Promise((resolve, reject) => {
                collection.findOne({utilisateur_connexion_id: idUtilisateurConnection}, (err, utilisateur) => {
                    if (err) {
                        reject(err);
                    }
                    if (!utilisateur) {
                        reject(new Error("Error find utilisateur by Id"));
                    }
                    resolve(utilisateur);
                });
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

function create( mail, salt, hash, session = undefined){
    try {
        let options = {};
        if(session) {
            options["session"] = session;
        }
        return db.then(async (db) => {
            const collection = db.collection(collectionName);
            const insertResult = await collection.insertOne({
                "utilisateur_connexion_mail": mail,
                "utilisateur_connexion_mdp_hash": hash,
                "utilisateur_connexion_mdp_salt": salt
            },
            { options });
            return insertResult.insertedId;
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}

module.exports = UtilisateurConnexionService;