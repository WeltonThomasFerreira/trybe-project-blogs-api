// Créditos: Não conseguiria entender a modelagem da relação n:n sem consultar o PR do Matheus-Luiz
// src: https://github.com/tryber/sd-014-b-project-blogs-api/pull/62

module.exports = (Sequelize, _DataTypes) => {
  const PostsCategory = Sequelize.define('PostsCategory', {},
    { timestamps: false });

  PostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
    return PostsCategory;
};