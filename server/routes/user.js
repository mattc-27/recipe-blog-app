const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post(`/register`, userController.createUser);
router.get(`/:user_id`, userController.userAuth, userController.fetchUser);

router.put(`/update/:user_id`, userController.userAuth, userController.updateUser);

module.exports = router;