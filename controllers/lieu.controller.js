const LieuService = require('../services/lieu.service');
const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');

const LieuController = {
    getAllLieux,
    getLieu
}
async function getAllLieux(req, res) {
    try {
        const { lieu_nom, page, pageSize } = req.query;
        const filters = { lieu_nom };
        const lieuxData = await LieuService.listAllLieux(filters, parseInt(page), parseInt(pageSize));
        res.json(normalizeApiResponse({ status: httpStatus.OK, data: lieuxData })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.OK);
    }
}

async function getLieu(req, res) {
    try {
        const { lieuId } = req.params;
        const lieu = await LieuService.getLieuById(lieuId);
        if (!lieu) {
            res.json(normalizeApiResponse({ errors: "Lieu not found", status: httpStatus.NOT_FOUND })).status(httpStatus.NOT_FOUND);
        } else {
            res.json(normalizeApiResponse({ status: httpStatus.OK, data: lieu })).status(httpStatus.OK);
        }
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = LieuController;

