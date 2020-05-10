'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('InstrumentTeachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      instrumentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Instruments',
          key: 'id'
        }
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'Teachers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type:DataTypes.DATE,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InstrumentTeachers');
  }
};
