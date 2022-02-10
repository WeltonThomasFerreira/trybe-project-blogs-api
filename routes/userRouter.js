const express = require('express');
const {
  validateNewUser,
  createNewUser,
  getAllUsers,
  getUserById,
} = require('../controllers/userController');

const {
  validateAuthorization,
} = require('../middlewares/validateAuthorization');

const router = express.Router();

router
  .route('/')
  .post(validateNewUser, createNewUser)
  .get(validateAuthorization, getAllUsers);

router.route('/:id').get(validateAuthorization, getUserById);

module.exports = router;
