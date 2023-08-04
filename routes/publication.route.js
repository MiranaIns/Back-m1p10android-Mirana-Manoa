const express = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const PublicationController = require('../controllers/publication.controller');

router.post('/', authMiddleware(), PublicationController.createPublication);
router.get('/', authMiddleware(), PublicationController.getPublicationsWithFilters);

module.exports = router;
