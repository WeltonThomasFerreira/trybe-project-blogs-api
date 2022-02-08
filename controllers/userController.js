const UserService = require('../services/userService');

exports.createNewUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await UserService.validateDisplayName(displayName);
    await UserService.validateEmail(email);
    await UserService.validatePassword(password);
    const token = await UserService.createNewUser(
      displayName,
      email,
      password,
      image,
    );
    return res.status(201).json({ token });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};
