const rescue = require('express-rescue');
const CategoriesService = require('../services/categoriesService');

exports.validateCategory = rescue(async (req, _res, next) => {
  const { name } = req.body;
  await CategoriesService.validateCategory(name);
  next();
});

exports.createNewCategory = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await CategoriesService.createNewCategory(name);
  return res.status(201).json(category);
});

exports.getAllCategories = rescue(async (_req, res) => {
  const categories = await CategoriesService.getAllCategories();
  return res.status(200).json(categories);
});
