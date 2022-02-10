const express = require('express');

const router = express.Router();

router
  .route('/')
  .post((req, res) => res.json({ message: '/categories, POST' }));

module.exports = router;
