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
  const schema = Joi.string().required().error(TITLE_IS_REQUIRED);
  await schema.validateAsync(title);
};

exports.validateContent = async (content) => {
  const schema = Joi.string().required().error(CONTENT_IS_REQUIRED);
  await schema.validateAsync(content);
};

exports.validateCategoryIds = async (categoryIds) => {
  const schema = Joi.array().required().error(CATEGORYID_IS_REQUIRED);
  await schema.validateAsync(categoryIds);
  const response = await Category.findAll({ attributes: ['id'], raw: true });
  const categories = response.map((category) => category.id);
  const categoryNotFound = categoryIds.some((id) => !categories.includes(id));
  if (categoryNotFound) throw CATEGORYID_NOT_FOUND;
};

const createDataPost = (response) => {
  try {
    const {
      dataValues: { title, content, userId, published, updated },
    } = response;
    return { id: response.null, title, content, userId, published, updated };
  } catch (error) {
    throw new Error('Unable to map response from database');
  }
};

exports.createNewPost = async (authorization, title, content, categoryIds) => {
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
};

exports.getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  // const result = response.map((post) => post.dataValues);
  // console.log(posts);
  return posts;
};
