const UserService = require('../services/userService');

const createNewUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await UserService.validateDisplayName(displayName);
    await UserService.validateEmail(email);
    await UserService.validatePassword(password);
    const newUser = await UserService.createNewUser(
      displayName,
      email,
      password,
      image,
    );
    // TODO
    res.json({ newUser });
  } catch (error) {
    // TODO
    res.json({ error });
  }
};

module.exports = { createNewUser };
