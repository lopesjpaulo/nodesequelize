module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      path: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references : {
              model: 'user',
              key: 'id'
          },
          onDelete: 'CASCADE'
      }
  },
  {   
      classMethods: {

      },
      hooks: {

      },
      timestamp: true,
      paranoid: true
  });

  Document.associate = function(models) {
      Document.belongsTo(models.User, {
          as: 'users',
          foreignKey: 'userId'
      });
  };

  return Document;
}