'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Banks', { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        value: {
            type: DataTypes.STRING
        },
        label: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.fn('NOW'),
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.fn('NOW'),
          },
          deletedAt: {
            type:DataTypes.DATE,
            allowNull: true
          }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Banks');
  }
};
