const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');
const PublicationService = require('../services/publication.service');
const ApiError = require('../errors/api.error');

const PublicationController = {
    getPublicationById,
    createPublication,
    getPublicationsWithFilters
}

async function getPublicationById(req, res) {
    try {
        const publicationId = req.params.id;
        const publication = await PublicationService.findById(publicationId);
        res.json(normalizeApiResponse({ status: httpStatus.OK, data: [publication] })).status(httpStatus.OK);
    } catch (e) {
        res.json(normalizeApiResponse({ errors: e.message, status: httpStatus.NOT_FOUND })).status(httpStatus.OK);
    }
}

async function createPublication(req, res) {
    try {
        const publicationData = req.body;
        const publicationId = await PublicationService.create(publicationData);
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
        const { search, page, pageSize } = req.query;
        const publicationsData = await PublicationService.findAllWithFilters(search, parseInt(page), parseInt(pageSize));
        res.json(normalizeApiResponse({ status: httpStatus.OK, data: [publicationsData] })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.OK);
    }
}

module.exports = PublicationController;
