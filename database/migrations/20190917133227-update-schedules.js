'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Schedules', 'finishedAt', 
    {
      type: DataTypes.DATE,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Schedules',
      'finishedAt'
    );
  }
};
