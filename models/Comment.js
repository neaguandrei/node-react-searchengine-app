module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comments', {
        idComment: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        commentText: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        }
      })
  
      comment.associate = models => {
        models.comment.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      };
        return comment;
  };