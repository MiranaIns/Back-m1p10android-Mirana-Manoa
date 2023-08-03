const responsePayload = () => {
    return {
        "status": 500,
        "errors": [],
        "data": {}
    }
}
const responseSenderMiddleware = async (err,req,res,next)=>{
    let payload = responsePayload();
    if(err){
        payload.errors = err;
    }
    if(res.locals.status){
        payload.status = res.locals.status;
    }
    if(res.locals.data){
        payload.data = res.locals.data;
    }
    res.send(payload).status(200);
    next();
}
module.exports = responseSenderMiddleware;