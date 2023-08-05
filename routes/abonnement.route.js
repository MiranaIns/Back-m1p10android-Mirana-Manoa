const express = require('express');
const router = express.Router();
const AbonnementsController = require('../controllers/abonnement.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/subscribe', authMiddleware(), AbonnementsController.subscribeToLieu);
router.delete('/unsubscribe', authMiddleware(), AbonnementsController.unsubscribeFromLieu);

module.exports = router;
