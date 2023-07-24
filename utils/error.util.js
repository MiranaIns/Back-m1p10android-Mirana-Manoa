const formatError = (error) => {
    if(error.errors){
        return error.errors.map((v)=>{
            return {
                message: v.message,
                field: v.path
            }
        })
    }
    else{
        return error.message;
    }
}

const ErrorUtil = {
    formatError
};

