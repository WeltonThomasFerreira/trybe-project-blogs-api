const UserService = require('../services/userService');

const SERVER_ERROR = 'Internal Server Error';

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
      .json({ message: error.msg || SERVER_ERROR });
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
      .json({ message: error.msg || SERVER_ERROR });
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
      .json({ message: error.msg || SERVER_ERROR });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};
