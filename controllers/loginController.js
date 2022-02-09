const LoginService = require('../services/loginService');

exports.validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await LoginService.validateEmail(email);
    await LoginService.validatePassword(password);
    next();
  } catch (error) {
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};
