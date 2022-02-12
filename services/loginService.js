require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {
  EMAIL_IS_REQUIRED,
  EMAIL_IS_EMPTY,
  PASSWORD_IS_REQUIRED,
  PASSWORD_IS_EMPTY,
  INVALID_FIELDS,
} = require('./errors');

exports.validateEmail = async (email) => {
  const schema = Joi.object({
    isRequired: Joi.string().required().allow('').error(EMAIL_IS_REQUIRED),
    isEmpty: Joi.string().empty().error(EMAIL_IS_EMPTY),
  });
  await schema.validateAsync({ isRequired: email, isEmpty: email });
};

exports.validatePassword = async (password) => {
  const schema = Joi.object({
    isRequired: Joi.string().required().allow('').error(PASSWORD_IS_REQUIRED),
    isEmpty: Joi.string().empty().error(PASSWORD_IS_EMPTY),
  });
  await schema.validateAsync({ isRequired: password, isEmpty: password });
};

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) throw INVALID_FIELDS;
  return jwt.sign({ data: { email, password } }, process.env.JWT_SECRET);
};
