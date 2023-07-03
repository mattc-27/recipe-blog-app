const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get(`/protected/:id`, authController.userAuth, authController.verifyUser);


module.exports = router;