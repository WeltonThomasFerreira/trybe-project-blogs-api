const express = require('express');
const {
  validateNewUser,
  createNewUser,
  validateAuthorization,
  getAllUsers,
  getUserById,
} = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .post(validateNewUser, createNewUser)
  .get(validateAuthorization, getAllUsers);

router.route('/:id').get(validateAuthorization, getUserById);

module.exports = router;
