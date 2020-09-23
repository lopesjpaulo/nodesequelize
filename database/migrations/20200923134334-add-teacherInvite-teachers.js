'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn('Teachers', 'teacherInvite',
      {
        type: DataTypes.INTEGER,
        allowNull: true,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Teachers',
      'teacherInvite'
    );
  }
};
