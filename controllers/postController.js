const rescue = require('express-rescue');
const PostService = require('../services/postService');

exports.validatePost = rescue(async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  await PostService.validateTitle(title);
  await PostService.validateContent(content);
  await PostService.validateCategoryIds(categoryIds);
  next();
});

exports.createNewPost = rescue(async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, categoryIds } = req.body;
  const blogPost = await PostService.createNewPost(
    authorization,
    title,
    content,
    categoryIds,
  );
  return res.status(201).json(blogPost);
});

exports.getAllPosts = rescue(async (req, res) => {
  const blogPosts = await PostService.getAllPosts();
  return res.status(200).json(blogPosts);
});
