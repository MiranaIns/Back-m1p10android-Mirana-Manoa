class Constant {}
Constant.LOG_INFO='info';
Constant.LOG_WARN='warn';
Constant.LOG_ERROR='error';
Constant.HTTP_SUCCESS= 200;
Constant.HTTP_CREATED= 201;
Constant.HTTP_BAD_REQUEST=400;
Constant.HTTP_ACCESS_DENIED= 403;
Constant.HTTP_NOT_FOUND= 404;
Constant.HTTP_INTERNAL_SERVER_ERROR= 500;
Object.freeze(Constant);
module.exports = Constant;