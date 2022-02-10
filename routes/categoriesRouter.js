const express = require('express');
const {
  validateAuthorization,
} = require('../middlewares/validateAuthorization');
const {
  validateCategory,
  createNewCategory,
} = require('../controllers/categoriesController');

const router = express.Router();

router
  .route('/')
  .post(validateAuthorization, validateCategory, createNewCategory);

module.exports = router;
