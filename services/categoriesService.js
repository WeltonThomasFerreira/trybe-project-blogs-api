const Joi = require('joi');
const { Category } = require('../models');
const { NAME_IS_REQUIRED, CATEGORY_ALREADY_REGISTERED } = require('./errors');

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
    const ER_DUP_ENTRY = 1062;
    if (error.parent.errno === ER_DUP_ENTRY) {
      throw CATEGORY_ALREADY_REGISTERED();
    }
    throw error;
  }
};

exports.getAllCategories = async () => {
  try {
    return Category.findAll({ order: ['id'] });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
