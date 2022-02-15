'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('PostsCategories', 'postId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'BlogPosts',
        key: 'id',
      },
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    queryInterface.addColumn('PostsCategories', 'categoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('PostsCategories', 'postId');
    await queryInterface.removeColumn('PostsCategories', 'categoryId');
  },
};
