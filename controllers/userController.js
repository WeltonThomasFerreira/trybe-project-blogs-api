const rescue = require('express-rescue');
const UserService = require('../services/userService');

exports.validateNewUser = rescue(async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  await UserService.validateDisplayName(displayName);
  await UserService.validateEmail(email);
  await UserService.validatePassword(password);
  next();
});

exports.createNewUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await UserService.createNewUser(
    displayName,
    email,
    password,
    image,
  );
  return res.status(201).json({ token });
});

exports.getAllUsers = rescue(async (_req, res) => {
  const users = await UserService.getAllUsers();
  return res.status(200).json(users);
});

exports.getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  return res.status(200).json(user);
});
