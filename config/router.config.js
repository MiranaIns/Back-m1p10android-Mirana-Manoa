const AuthentificationRouter = require('../routes/authentification.route');
const PublicationRouter = require('../routes/publication.route');
const LieuRouter = require('../routes/lieu.route');
const CategorieRouter = require('../routes/categorie.route');
const configureRouter = (app) => {
    app.use('/authentification', AuthentificationRouter);
    app.use('/publications', PublicationRouter);
    app.use('/lieux', LieuRouter);
    app.use('/categories', CategorieRouter)
}

module.exports = configureRouter