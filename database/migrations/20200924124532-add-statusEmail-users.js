'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Users', 'statusEmail',
      {
        type: DataTypes.INTEGER,
        defaultValue: 0
      });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'Users',
      'statusEmail'
    );
  }
};

