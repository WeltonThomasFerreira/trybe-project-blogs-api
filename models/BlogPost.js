module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.defines('User', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  BlogPost.associate = (models) => {
    BlogPost.hasOne(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return BlogPost;
};
