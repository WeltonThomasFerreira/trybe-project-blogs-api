const express = require('express');
const {
  validateNewUser,
  createNewUser,
  validateAuthorization,
  getAllUsers,
} = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .post(validateNewUser, createNewUser)
  .get(validateAuthorization, getAllUsers);

module.exports = router;
