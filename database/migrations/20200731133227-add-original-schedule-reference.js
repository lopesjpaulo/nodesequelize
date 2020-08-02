'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Schedules', 'originalSchedule',
      {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model: 'Schedules',
          key: 'id'
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Schedules',
      'originalSchedule'
    );
  }
};
