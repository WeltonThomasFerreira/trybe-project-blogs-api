const rescue = require('express-rescue');
const LoginService = require('../services/loginService');

exports.validateLogin = rescue(async (req, _res, next) => {
  const { email, password } = req.body;
  await LoginService.validateEmail(email);
  await LoginService.validatePassword(password);
  next();
});

exports.login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await LoginService.login(email, password);
  res.status(200).json({ token });
});
