const normalizeApiResponse = ({ data = {}, status = 200, errors = [] })=>{
    return {
        status,
        data,
        errors
    }
}

module.exports = {
    normalizeApiResponse
};