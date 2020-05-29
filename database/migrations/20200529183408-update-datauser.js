'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn(
      'Datausers', 
      'customer_id', 
      {
        type: DataTypes.STRING,
        allowNull: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Databanks',
      'customer_id'
    )
  }
};
