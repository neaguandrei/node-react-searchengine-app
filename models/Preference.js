module.exports = (sequelize, DataTypes) => {
    const preference = sequelize.define('preferences', {
        idPreference: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        commentText: {
          type: DataTypes.STRING,
          allowNull: false
        }
      });
  
      preference.associate = function (models) {
        models.preference.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
    };

    return preference;
  };