'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Users', 'validEmail',
      {
        type: DataTypes.STRING,
        allowNull: true,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'validEmail'
    );
  }
};
