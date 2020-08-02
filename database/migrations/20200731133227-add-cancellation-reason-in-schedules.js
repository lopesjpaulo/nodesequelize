'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Schedules', 'cancellationReason',
    {
      type: DataTypes.TEXT,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Schedules',
      'cancellationReason'
    );
  }
};
