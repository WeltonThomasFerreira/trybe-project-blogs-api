const Joi = require('joi');
const {
  DISPLAY_NAME_INVALID,
  EMAIL_IS_REQUIRED,
  EMAIL_IS_INVALID,
} = require('./errors');

exports.validateDisplayName = async (displayName) => {
  const schema = Joi.string().required().min(8).error(DISPLAY_NAME_INVALID);
  try {
    await schema.validateAsync(displayName);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.validateEmail = async (email) => {
  const schema = Joi.object({
    isRequired: Joi.string().required().error(EMAIL_IS_REQUIRED),
    isValid: Joi.string().email().error(EMAIL_IS_INVALID),
  });
  try {
    await schema.validateAsync({ isRequired: email, isValid: email });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
