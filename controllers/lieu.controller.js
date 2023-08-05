const LieuService = require('../services/lieu.service');
const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');

const LieuController = {
    getAllLieux
}
async function getAllLieux(req, res) {
    try {
        const { lieu_nom, page, pageSize } = req.query;
        const filters = { lieu_nom };
        const lieuxData = await LieuService.listAllLieux(filters, parseInt(page), parseInt(pageSize));
        res.json(normalizeApiResponse({ status: httpStatus.OK, data: [lieuxData] })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.OK);
    }
}

module.exports = LieuController;

