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
  const schema = Joi.string().required().min(8).error(DISPLAY_NAME_IS_INVALID);
  await schema.validateAsync(displayName);
};

exports.validateEmail = async (email) => {
  const schema = Joi.object({
    isRequired: Joi.string().required().error(EMAIL_IS_REQUIRED),
    isValid: Joi.string().email().error(EMAIL_IS_INVALID),
  });
  await schema.validateAsync({ isRequired: email, isValid: email });
};

exports.validatePassword = async (password) => {
  const schema = Joi.object({
    isRequired: Joi.string().required().error(PASSWORD_IS_REQUIRED),
    isValid: Joi.string().min(6).error(PASSWORD_IS_INVALID),
  });
  await schema.validateAsync({ isRequired: password, isValid: password });
};

const createDataUser = (response) => {
  try {
    const {
      dataValues: { email, password },
    } = response;
    return { id: response.null, email, password };
  } catch (error) {
    throw new Error('Unable to map response from database');
  }
};

exports.createNewUser = async (displayName, email, password, image) => {
  try {
    const response = await User.create({ displayName, email, password, image });
    const user = createDataUser(response);
    return jwt.sign({ data: user }, process.env.JWT_SECRET);
  } catch (error) {
    const ER_DUP_ENTRY = 1062;
    if (error.parent.errno === ER_DUP_ENTRY) throw USER_ALREADY_REGISTERED;
    throw error;
  }
};

exports.getAllUsers = async () => User.findAll({ order: ['id'] });

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw USER_DOES_NOT_EXIST;
  return user;
};
