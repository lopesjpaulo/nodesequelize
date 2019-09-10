'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('InstrumentUsers', { 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      instrumentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'instruments',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type:DataTypes.DATE,
        allowNull: true
      }
    });
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('InstrumentUsers');
  }
};
