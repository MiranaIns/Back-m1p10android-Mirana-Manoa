const express = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const LieuController = require("../controllers/lieu.controller");

router.get('/', authMiddleware(), LieuController.getAllLieux);

module.exports = router;
