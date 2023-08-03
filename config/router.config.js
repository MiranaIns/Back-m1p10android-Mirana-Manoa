const AuthentificationRouter = require('../routes/authentification.route')
const configureRouter = (app) => {
    app.use('/authentification', AuthentificationRouter)
}

module.exports = configureRouter