'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('teachers', 
    { 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      cpf: {
        type: DataTypes.STRING(14),
        allowNull: true,
        unique:true
      },
      balance: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: '0'
      },
      value_one: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      value_five: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      value_ten: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
    });
  },

  down: (queryInterface, DataTypes) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
