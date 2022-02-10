const express = require('express');
const {
  validateAuthorization,
} = require('../middlewares/validateAuthorization');
const {
  validateCategory,
  createNewCategory,
  getAllCategories,
} = require('../controllers/categoriesController');

const router = express.Router();

router
  .route('/')
  .post(validateAuthorization, validateCategory, createNewCategory)
  .get(validateAuthorization, getAllCategories);

module.exports = router;
