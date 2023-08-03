const bcrypt = require('bcrypt');
const UtilisateurConnexionService = require("./utilisateurConnexion.service")
const TokenService = require('./token.service');
const Database = require("../database");
const UtilisateurService = require("./utilisateur.service");

const db = Database.getInstance();
const client = Database.getMongoClient();

const AuthentificationService = {
    login,
    register
};

async function login(mail, motDePasse){
    try{
        let utilisateurConnexion = await UtilisateurConnexionService.findUtilisateurConnexionByEmail(mail.toLowerCase());
        if(!utilisateurConnexion ) {
            throw new Error("Invalid email or password")
        }
        let motDePasseHash = bcrypt.hashSync(motDePasse,utilisateurConnexion.utilisateur_connexion_mdp_hash);
        if(utilisateurConnexion.utilisateur_connexion_mdp_hash === motDePasseHash){
            let utilisateur = await UtilisateurConnexionService.findUtilisateurByUtilisateurConnexionId(utilisateurConnexion._id);
            return TokenService.generateAuthTokens(utilisateur);
        }
        else throw new Error("Invalid email or password");
    }
    catch(err){
        throw err;
    }
}

async function register(utilisateur){
    try{
        let {mail, mdp, nom, prenom, pseudo, sexe, date_naissance} = utilisateur;
        let utilisateurConnexion = await UtilisateurConnexionService.findUtilisateurConnexionByEmail(mail.toLowerCase());
        if(utilisateurConnexion) {
            throw new Error("Account already exists");
        }

        client.then(async client => {
            const session = await client.startSession();
            session.startTransaction();
            try {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(mdp,salt);
                const utilisateurConnexionId = await UtilisateurConnexionService.create(mail.toLowerCase(),salt,hash, session);
                const utilisateurId = await UtilisateurService.create(nom, prenom, pseudo, date_naissance, sexe, mail.toLowerCase(),utilisateurConnexionId,session);
                await session.commitTransaction();
            } catch (e) {
                await session.abortTransaction();
                throw e;
            } finally {
                await session.endSession();
            }
        });
    }
    catch(err){
        throw err;
    }
}

module.exports = AuthentificationService;