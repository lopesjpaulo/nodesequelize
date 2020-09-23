module.exports = (sequelize, DataTypes) => {
  const Datauser = sequelize.define('Datauser', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      birthday: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              notEmpty: true
          }
      },
      cpf: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              notEmpty: true
          }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: 'user',
            key: 'id'
        }
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: '0'
    },
  },
  {
      classMethods: {

      },
      hooks: {

      },
      timestamp: true,
      paranoid: true
  });

  Datauser.associate = function(models) {
      Datauser.belongsTo(models.User, {
          as: 'users',
          foreignKey: 'userId'
      });
  };

  return Datauser;
}
