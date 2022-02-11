const express = require('express');
const {
  validateAuthorization,
} = require('../middlewares/validateAuthorization');
const { validatePost, createNewPost } = require('../controllers/postController');

const router = express.Router();

router.route('/').post(validateAuthorization, validatePost, createNewPost);

module.exports = router;
