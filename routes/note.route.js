const express = require('express');
const router = express.Router();
const NotesController = require('../controllers/note.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/rate', authMiddleware(), NotesController.rateLieu);

module.exports = router;
