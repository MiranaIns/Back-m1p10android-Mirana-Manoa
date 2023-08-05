const ReactionsService = require('../services/reaction.service');
const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');

const ReactionController = {
    createReaction,
    deleteReaction
}
async function createReaction(req, res) {
    try {
        const {fk_publication_id } = req.body;
        const insertedId = await ReactionsService.createReaction(req.utilisateur, fk_publication_id);
        res.json(normalizeApiResponse({ status: httpStatus.CREATED, data: { insertedId } })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function deleteReaction(req, res) {
    try {
        const { fk_publication_id } = req.body;
        const deletedCount = await ReactionsService.deleteReaction(req.utilisateur, fk_publication_id);

        if (deletedCount === 0) {
            res.json(normalizeApiResponse({ errors: "Reaction not found", status: httpStatus.NOT_FOUND })).status(httpStatus.NOT_FOUND);
        } else {
            res.json(normalizeApiResponse({ status: httpStatus.OK, data: { deletedCount } })).status(httpStatus.OK);
        }
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = ReactionController;
