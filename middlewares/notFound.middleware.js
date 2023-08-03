const Constant = require('../utils/constant.util');

const notFoundMiddleware = (req, res,next) =>{
    next({errors: "The ressource you're trying to reach doesn't exist.",status: Constant.HTTP_NOT_FOUND});
}
module.exports = notFoundMiddleware;