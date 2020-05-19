'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Databanks', { 
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull:false
        },
        bank: {
          type: DataTypes.STRING,
          allowNull: false
        },
        agency: {
          type: DataTypes.STRING,
          allowNull: false
        },
        account: {
          type: DataTypes.STRING,
          allowNull: false
        },
        digit: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
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

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Databanks');
  }
};
