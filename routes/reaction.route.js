const express = require('express');
const router = express.Router();
const ReactionsController = require('../controllers/reaction.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/', authMiddleware(), ReactionsController.createReaction);
router.post('/', authMiddleware(), ReactionsController.deleteReaction);

module.exports = router;
