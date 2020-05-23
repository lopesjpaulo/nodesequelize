'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn(
        'Schedules',
        'instrumentId',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          references:{
            model: 'Instruments',
            key: 'id'
          }
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Schedules',
        'instrumentId'
      ),
    ])
  }
};
