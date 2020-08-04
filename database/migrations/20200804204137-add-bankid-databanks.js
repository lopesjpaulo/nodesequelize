'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Databanks', 'bankId',
    {
      type: DataTypes.INTEGER,
      references:{
        model: 'Banks',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Databanks',
        'bankId'
      );
  }
};
