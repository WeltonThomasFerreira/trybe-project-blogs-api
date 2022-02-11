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
  USER_DOES_NOT_EXIST,
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

const createDataUser = (response) => {
  try {
    const {
      dataValues: { email, password },
      dataValues,
    } = response;
    return { id: dataValues.null, email, password };
  } catch (error) {
    console.error(error);
    throw new Error('Unable to map response from database');
  }
};

exports.createNewUser = async (displayName, email, password, image) => {
  try {
    const response = await User.create({ displayName, email, password, image });
    const user = createDataUser(response);
    return jwt.sign({ data: user }, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    const ER_DUP_ENTRY = 1062;
    if (error.parent.errno === ER_DUP_ENTRY) throw USER_ALREADY_REGISTERED;
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    return User.findAll({ order: ['id'] });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw USER_DOES_NOT_EXIST;
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
