const AuthentificationRouter = require('../routes/authentification.route');
const PublicationRouter = require('../routes/publication.route');
const configureRouter = (app) => {
    app.use('/authentification', AuthentificationRouter);
    app.use('/publications', PublicationRouter);
}

module.exports = configureRouter