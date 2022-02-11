const PostService = require('../services/postService');

const SERVER_ERROR = 'Internal Server Error';

exports.validatePost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};

exports.createNewPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const blogPost = await PostService.createNewPost(
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
