const express = require('express');
const router = express.Router();
const AuthentificationController = require('../controllers/authentification.controller');

router.post('/login', AuthentificationController.login);
router.post('/register', AuthentificationController.register);
module.exports = router;