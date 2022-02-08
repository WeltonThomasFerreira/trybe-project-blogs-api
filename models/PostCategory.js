module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory');
  PostCategory.associate = (models) => {
    PostCategory.hasMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'postId',
    });
    PostCategory.hasMany(models.Category, {
      foreignKey: 'id',
      as: 'categoryId',
    });
  };
  return PostCategory;
};
