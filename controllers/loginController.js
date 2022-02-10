const LoginService = require('../services/loginService');

const SERVER_ERROR = 'Internal Server Error';

exports.validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await LoginService.validateEmail(email);
    await LoginService.validatePassword(password);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};
