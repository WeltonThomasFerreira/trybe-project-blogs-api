module.exports = (sequelize, DataTypes) => {
  const User = sequelize.defines('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsTo(models.BlogPost, {
      foreignKey: 'UserId',
      as: 'posts',
    });
  };

  return User;
};
