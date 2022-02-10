const Joi = require('joi');
const { Category } = require('../models');
const { NAME_IS_REQUIRED } = require('./errors');

exports.validateCategory = async (name) => {
  try {
    const schema = Joi.string().required().error(NAME_IS_REQUIRED);
    await schema.validateAsync(name);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.createNewCategory = async (name) => {
  try {
    const response = await Category.create({ name });
    const category = { ...response.dataValues };
    category.id = response.null;
    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
