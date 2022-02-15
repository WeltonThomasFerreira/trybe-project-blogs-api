module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostsCategory', {
    id: {
      primaryKey: true, type: DataTypes.INTEGER,
    } }, { timestamps: false });

  PostCategory.associate = (models) => {
    PostCategory.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: models.PostsCategory,
      foreignKey: 'id', 
      otherKey: 'id',
    }); PostCategory.belongsToMany(models.Category, {
      as: 'categoryId',
      through: models.PostsCategory,
      foreignKey: 'id', 
      otherKey: 'id',
    });
  };
  return PostCategory;
};