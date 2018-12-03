module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  user.associate = models => {
    user.hasMany(models.search);
  };

  return user
};