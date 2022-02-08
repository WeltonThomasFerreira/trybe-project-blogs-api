const express = require('express');
const {
  validateNewUser,
  createNewUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').post(validateNewUser, createNewUser);

module.exports = router;
