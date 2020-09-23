'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Datausers', 'balance',
      {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'Datausers',
      'balance'
    );
  }
};
