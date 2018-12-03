module.exports = (sequelize, DataTypes) => {
    const preference = sequelize.define('preferences', {
        idPreference: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        webPages: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }, 
        news: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        images: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        from: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "24 hours ago"
        },
        userEmail: {
          type: DataTypes.STRING,
          allowNull: false,
          foreignKey: true
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