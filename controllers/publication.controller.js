const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');
const PublicationService = require('../services/publication.service');
const ApiError = require('../errors/api.error');

const PublicationController = {
    createPublication,
    getPublicationsWithFilters
}

async function createPublication(req, res) {
    try {
        const publicationData = req.body;
        const publicationId = await PublicationService.create(req.utilisateur, publicationData);
        res.json(normalizeApiResponse({ status: httpStatus.CREATED, data: [publicationId] })).status(httpStatus.OK);
    } catch (err) {
        if (err instanceof ApiError) {
            res.json(normalizeApiResponse({ errors: err.message, status: err.statusCode })).status(httpStatus.OK);
        } else {
            res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.OK);
        }
    }
}

async function getPublicationsWithFilters(req, res) {
    try {
        const { search, fk_categorie_id, fk_lieu_id, page, pageSize } = req.query;
        const filters = { search, fk_categorie_id, fk_lieu_id };
        const publicationsData = await PublicationService.findAllWithFilters(filters, parseInt(page), parseInt(pageSize));
        res.json(normalizeApiResponse({ status: httpStatus.OK, data: [publicationsData] })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.OK);
    }
}


module.exports = PublicationController;
