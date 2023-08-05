const NotesService = require('../services/note.service');
const httpStatus = require('http-status');
const { normalizeApiResponse } = require('../utils/apiResponse.util');

const NoteController = {
    rateLieu
}
async function rateLieu(req, res) {
    try {
        const {fk_lieu_id, note } = req.body;
        const insertedId = await NotesService.rateLieu(req.utilisateur, fk_lieu_id, note);
        res.json(normalizeApiResponse({ status: httpStatus.CREATED, data: { insertedId } })).status(httpStatus.OK);
    } catch (err) {
        res.json(normalizeApiResponse({ errors: err.message, status: httpStatus.INTERNAL_SERVER_ERROR })).status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = NoteController;
