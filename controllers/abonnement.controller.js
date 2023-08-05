const AbonnementsService = require('../services/abonnement.service');
const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');

const AbonnementController = {
    subscribeToLieu,
    unsubscribeFromLieu
}
async function subscribeToLieu(req, res) {
    try {
        const {fk_lieu_id} = req.body;
        const insertedId = await AbonnementsService.subscribeToLieu(req.utilisateur, fk_lieu_id);
        res.json(normalizeApiResponse({ status: httpStatus.CREATED, data: { insertedId } })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function unsubscribeFromLieu(req, res) {
    try {
        const {fk_lieu_id } = req.body;
        const deletedCount = await AbonnementsService.unsubscribeFromLieu(req.utilisateur, fk_lieu_id);

        if (deletedCount === 0) {
            res.json(normalizeApiResponse({ errors: "Subscription not found", status: httpStatus.NOT_FOUND })).status(httpStatus.NOT_FOUND);
        } else {
            res.json(normalizeApiResponse({ status: httpStatus.OK, data: { deletedCount } })).status(httpStatus.OK);
        }
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = AbonnementController;
