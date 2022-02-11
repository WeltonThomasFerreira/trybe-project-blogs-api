const Joi = require('joi');
const { Category } = require('../models');
const {
  TITLE_IS_REQUIRED,
  CONTENTS_IS_REQUIRED,
  CATEGORYID_IS_REQUIRED,
  CATEGORYID_NOT_FOUND,
} = require('./errors');

exports.validateTitle = async (title) => {
  try {
    const schema = Joi.string().required().error(TITLE_IS_REQUIRED);
    await schema.validateAsync(title);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.validateContent = async (content) => {
  try {
    const schema = Joi.string().required().error(CONTENTS_IS_REQUIRED);
    await schema.validateAsync(content);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.validateCategoryIds = async (categoryIds) => {
  try {
    const schema = Joi.array().required().error(CATEGORYID_IS_REQUIRED);
    await schema.validateAsync(categoryIds);
    categoryIds.forEach(async (id) => {
      if (!(await Category.findByPk(id))) throw CATEGORYID_NOT_FOUND();
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.createNewPost = async (title, content, categoryIds) => {
  try {
    // TODO
  } catch (error) {
    console.error(error);
    throw error;
  }
};
