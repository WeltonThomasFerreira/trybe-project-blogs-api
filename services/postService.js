require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Category, BlogPost, User, PostsCategory } = require('../models');
const {
  TITLE_IS_REQUIRED,
  CONTENT_IS_REQUIRED,
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
    const schema = Joi.string().required().error(CONTENT_IS_REQUIRED);
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
      if (!(await Category.findByPk(id))) throw CATEGORYID_NOT_FOUND;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createDataPost = (response) => {
  try {
    const {
      dataValues: { title, content, userId, published, updated },
    } = response;
    return { id: response.null, title, content, userId, published, updated };
  } catch (error) {
    console.error(error);
    throw new Error('Unable to map response from database');
  }
};

exports.createNewPost = async (authorization, title, content, categoryIds) => {
  try {
    console.log(`Ids de categorias: ${categoryIds}`);
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.data.email } });
    const response = await BlogPost.create({
      title,
      content,
      userId: user.dataValues.id,
    });
    const post = createDataPost(response);
    categoryIds.forEach(async (id) => {
      await PostsCategory.create({ postId: post.id, categoryId: id });
    });
    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
