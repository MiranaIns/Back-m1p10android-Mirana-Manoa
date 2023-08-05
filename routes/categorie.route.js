const express = require('express');
const router = express.Router();
const CategorieController = require('../controllers/categorie.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware(), CategorieController.getAllCategories);

module.exports = router;
