const express = require('express');
const {
  validateAuthorization,
} = require('../middlewares/validateAuthorization');
const {
  validatePost,
  createNewPost,
  getAllPosts,
} = require('../controllers/postController');

const router = express.Router();

router
  .route('/')
  .post(validateAuthorization, validatePost, createNewPost)
  .get(getAllPosts);

module.exports = router;
