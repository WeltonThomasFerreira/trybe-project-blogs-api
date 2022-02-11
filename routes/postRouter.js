const express = require('express');
const {
  validateAuthorization,
} = require('../middlewares/validateAuthorization');

const router = express.Router();

router.route('/').post(validateAuthorization);

module.exports = router;
