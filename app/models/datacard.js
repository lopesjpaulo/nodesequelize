module.exports = (sequelize, DataTypes) => {
  const Datacard = sequelize.define('Datacard', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      card_id: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      digits: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      expiration: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      brand: {
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
        }
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

  Datacard.associate = function(models) {
      Datacard.belongsTo(models.User, {
          as: 'users',
          foreignKey: 'userId'
      });
  };

  return Datacard;
}