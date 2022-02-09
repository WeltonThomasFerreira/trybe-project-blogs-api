const express = require('express');
const { validateLogin, login } = require('../controllers/loginController');

const router = express.Router();

router.route('/').post(validateLogin, login);

module.exports = router;
