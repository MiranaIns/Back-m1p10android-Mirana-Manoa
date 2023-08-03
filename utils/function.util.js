const FunctionUtil = {
    redux: redux
}


function redux(array, keys_to_keep){
    try {
        array = array.map(o => keys_to_keep.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;}, {}));
        return array;
    }
    catch (e){
        throw e;
    }
}

module.exports = FunctionUtil;