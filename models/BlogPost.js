module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: { type: DataTypes.DATE, defaultValue: new Date() },
    updated: { type: DataTypes.DATE, defaultValue: new Date() },
  }, { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.hasOne(models.User, {
      foreignKey: 'id',
      as: 'UserId',
    });
  };

  return BlogPost;
};
