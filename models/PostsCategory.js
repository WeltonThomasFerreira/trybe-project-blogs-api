module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostsCategory', {
    id: {
      primaryKey: true, type: DataTypes.INTEGER,
    },
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { timestamps: false });

  PostCategory.associate = (models) => {
    PostCategory.hasMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'PostId',
    });
    PostCategory.hasMany(models.Category, {
      foreignKey: 'id',
      as: 'CategoryId',
    });
  };
  return PostCategory;
};
