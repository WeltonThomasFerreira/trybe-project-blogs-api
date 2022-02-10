const UserService = require('../services/userService');

exports.validateNewUser = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    await UserService.validateDisplayName(displayName);
    await UserService.validateEmail(email);
    await UserService.validatePassword(password);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await UserService.createNewUser(
      displayName,
      email,
      password,
      image,
    );
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};

exports.validateAuthorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await UserService.validateAuthorization(authorization);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};
