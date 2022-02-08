const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.route('/').post(UserController.createNewUser);

module.exports = router;
