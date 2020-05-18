'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Certifieds', { 
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull:false
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        path: {
          type: DataTypes.STRING,
          allowNull: true
        },
        teacherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Teachers',
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
      return queryInterface.dropTable('Certifieds');
  }
};
