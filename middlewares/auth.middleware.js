const passport = require('passport');
const httpStatus = require('http-status');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject({status: httpStatus.UNAUTHORIZED,message: 'Please authenticate'});
  }
  req.utilisateur = user;
  if (requiredRights&&requiredRights.length) {
    
  }
  resolve();
};

const authMiddleware =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => {next(err)});
  };

module.exports = authMiddleware;