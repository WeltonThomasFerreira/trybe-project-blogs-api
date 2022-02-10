const CategoriesService = require('../services/categoriesService');

const SERVER_ERROR = 'Internal Server Error';

exports.validateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    await CategoriesService.validateCategory(name);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};

exports.createNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoriesService.createNewCategory(name);
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || SERVER_ERROR });
  }
};
