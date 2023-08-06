const express = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const PublicationController = require('../controllers/publication.controller');
const upload = require('../middlewares/upload_file.middleware');

router.post('/', authMiddleware(), upload.single('publication_image'), PublicationController.createPublication);
router.get('/', authMiddleware(), PublicationController.getPublicationsWithFilters);

module.exports = router;
