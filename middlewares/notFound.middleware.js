const Logger = require('../utils/logger.util.js');
const Constant = require('../utils/constant.util');
const {normalizeApiResponse} = require("../utils/apiResponse.util");
const logger = new Logger();

const notFoundMiddleware = (req, res,next) =>{
    next({errors: "The ressource you're trying to reach doesn't exist.",status: Constant.HTTP_NOT_FOUND});
}
module.exports = notFoundMiddleware;