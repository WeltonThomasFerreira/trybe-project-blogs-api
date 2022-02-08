const Joi = require('joi');
const { User } = require('../models');
const {
  DISPLAY_NAME_IS_INVALID,
  EMAIL_IS_REQUIRED,
  EMAIL_IS_INVALID,
  PASSWORD_IS_REQUIRED,
  PASSWORD_IS_INVALID,
  USER_ALREADY_REGISTERED,
} = require('./errors');

exports.validateDisplayName = async (displayName) => {
  try {
    const schema = Joi.string()
      .required()
      .min(8)
      .error(DISPLAY_NAME_IS_INVALID);
    await schema.validateAsync(displayName);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.validateEmail = async (email) => {
  try {
    const schema = Joi.object({
      isRequired: Joi.string().required().error(EMAIL_IS_REQUIRED),
      isValid: Joi.string().email().error(EMAIL_IS_INVALID),
    });
    await schema.validateAsync({ isRequired: email, isValid: email });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.validatePassword = async (password) => {
  try {
    const schema = Joi.object({
      isRequired: Joi.string().required().error(PASSWORD_IS_REQUIRED),
      isValid: Joi.string().min(6).error(PASSWORD_IS_INVALID),
    });
    await schema.validateAsync({ isRequired: password, isValid: password });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.createNewUser = async (displayName, email, password, image) => {
  try {
    const user = await User.create({ displayName, email, password, image });
    return user.toJSON();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
