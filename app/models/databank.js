module.exports = (sequelize, DataTypes) => {
  const Databank = sequelize.define('Databank', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      bank: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      agency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      account: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
      digit: {
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

  Databank.associate = function(models) {
      Databank.belongsTo(models.Databank, {
          as: 'users',
          foreignKey: 'userId'
      });
  };

  return Databank;
}