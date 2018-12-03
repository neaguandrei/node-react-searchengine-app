module.exports = (sequelize, DataTypes) => {
    const search =  sequelize.define('searches', {
        idSearch: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        searchText: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        userEmail: {
          type: DataTypes.STRING,
          allowNull: false,
          foreignKey: true
        }
      });

      // search.associate = models => {
      //   models.search.belongsTo(models.user, {
      //     onDelete: "CASCADE",
      //     foreignKey: {
      //       allowNull: false
      //     }
      //   });
      // };

      return search;
};