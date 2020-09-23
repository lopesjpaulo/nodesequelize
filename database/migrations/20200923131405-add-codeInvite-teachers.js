'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Teachers', 'codeInvite',
      {
        type: DataTypes.STRING,
        allowNull: true,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Teachers',
      'codeInvite'
    );
  }
};
