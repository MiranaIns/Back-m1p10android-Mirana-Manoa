const CategorieService = require('../services/categorie.service');
const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');

const CategorieController = {
    getAllCategories
}
async function getAllCategories(req, res) {
    try {
        const categories = await CategorieService.listAllCategories();
        res.json(normalizeApiResponse({ status: httpStatus.OK, data: categories })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = CategorieController;
