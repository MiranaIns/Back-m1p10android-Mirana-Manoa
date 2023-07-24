const ApiError = require("../errors/api.error");
const BusinessError = require("../errors/business.error");
const {normalizeApiResponse} = require("../utils/apiResponse.util");
const http = require('http-status');
const errorMiddleware = (err,req,res,next)=>{
    const toSend = {
        errors: "Internal server error",
        status: http.INTERNAL_SERVER_ERROR
    };
    if(err instanceof ApiError){
        toSend.errors = err.message;
        toSend.status = err.statusCode;
    }
    else if(err instanceof BusinessError){
        toSend.errors = err.message;
        toSend.status = http.BAD_REQUEST;
    }
    else if(err.status){
        toSend.errors = err.message;
        toSend.status = err.status;
    }
    res.send(normalizeApiResponse(toSend)).status(http.OK);
}

module.exports = errorMiddleware;