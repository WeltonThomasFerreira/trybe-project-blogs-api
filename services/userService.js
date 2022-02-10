require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {
  DISPLAY_NAME_IS_INVALID,
  EMAIL_IS_REQUIRED,
  EMAIL_IS_INVALID,
  PASSWORD_IS_REQUIRED,
  PASSWORD_IS_INVALID,
  USER_ALREADY_REGISTERED,
  TOKEN_NOT_FOUND,
  INVALID_TOKEN,
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
    return jwt.sign({ data: user }, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    const ER_DUP_ENTRY = 1062;
    if (error.parent.errno === ER_DUP_ENTRY) throw USER_ALREADY_REGISTERED();
    throw error;
  }
};

exports.validateAuthorization = async (authorization) => {
  console.log(authorization);
  try {
    const schema = Joi.string().required().error(TOKEN_NOT_FOUND);
    await schema.validateAsync(authorization);
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: { email: decoded.data.email, password: decoded.data.password },
    });
    if (!user) throw INVALID_TOKEN();
  } catch (error) {
    console.error(error);
    if (error.message === 'jwt malformed') throw INVALID_TOKEN();
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    return User.findAll();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
