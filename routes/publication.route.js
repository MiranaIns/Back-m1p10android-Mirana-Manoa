const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/publication.controller');

router.get('/:id', PublicationController.getPublicationById);
router.post('/create', PublicationController.createPublication);
router.get('/filter', PublicationController.getPublicationsWithFilters);

module.exports = router;
