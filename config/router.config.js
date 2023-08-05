const AuthentificationRouter = require('../routes/authentification.route');
const PublicationRouter = require('../routes/publication.route');
const LieuRouter = require('../routes/lieu.route');
const CategorieRouter = require('../routes/categorie.route');
const ReactionRouter = require('../routes/reaction.route');
const AbonnementRouter = require('../routes/abonnement.route');
const NoteRouter = require('../routes/note.route');
const configureRouter = (app) => {
    app.use('/authentification', AuthentificationRouter);
    app.use('/publications', PublicationRouter);
    app.use('/lieux', LieuRouter);
    app.use('/categories', CategorieRouter);
    app.use('/reactions', ReactionRouter);
    app.use('/lieux', AbonnementRouter);
    app.use('/lieux', NoteRouter);
}

module.exports = configureRouter