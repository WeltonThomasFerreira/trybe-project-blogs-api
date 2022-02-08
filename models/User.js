module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  // User.associate = (models) => {
  //   User.belongsTo(models.BlogPost, {
  //     foreignKey: 'userId',
  //     as: 'posts',
  //   });
  // };

  return User;
};
