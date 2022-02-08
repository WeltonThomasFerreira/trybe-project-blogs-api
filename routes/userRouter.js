const express = require('express');

const router = express.Router();

router
  .route('/')
  .post((req, res) => res.json({ message: 'Teste de rota, /user, POST' }));

module.exports = router;
