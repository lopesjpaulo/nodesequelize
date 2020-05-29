'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Teachers', 
    { 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      birthday: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(2),
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cpf: {
        type: DataTypes.STRING(14),
        allowNull: true,
        unique:true
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0'
      },
      valueOne: {
        type: DataTypes.INTEGER(10),
        allowNull: true
      },
      valueFive: {
        type: DataTypes.INTEGER(10),
        allowNull: true
      },
      valueTen: {
        type: DataTypes.INTEGER(10),
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type:DataTypes.DATE,
        allowNull: true
      }
    });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Teachers');
  }
};
