const PostService = require('../services/postService');

const SERVER_ERROR = 'Internal Server Error';

exports.validatePost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    await PostService.validateTitle(title);
    await PostService.validateContent(content);
    await PostService.validateCategoryIds(categoryIds);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};

exports.createNewPost = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;
    const blogPost = await PostService.createNewPost(
      authorization,
      title,
      content,
      categoryIds,
    );
    return res.status(201).json(blogPost);
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};
