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
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: 'teacher',
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
      Databank.belongsTo(models.Teacher, {
          as: 'teachers',
          foreignKey: 'teacherId'
      });
      Databank.belongsTo(models.Bank, {
        as: 'banks',
        foreignKey: 'bankId'
    });
  };

  return Databank;
}