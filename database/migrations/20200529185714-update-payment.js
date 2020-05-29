'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn(
      'Payments', 
      'transaction_id', 
      {
        type: DataTypes.STRING,
        allowNull: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Payments',
      'transaction_id'
    )
  }
};
