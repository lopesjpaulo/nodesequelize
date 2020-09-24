'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Logpayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'Schedules',
          key: 'id'
        }
      },
      paidBalance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },  
      paidTransaction: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      balanceFinal: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Logpayments');
  }
};
