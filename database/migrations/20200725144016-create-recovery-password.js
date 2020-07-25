'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Recoveries', { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        codigo: {
            type: DataTypes.STRING
        },
        used: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },  
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            }
        },
        expiresAt: {
            type: DataTypes.DATE
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

  down: (queryInterface, Datatypes) => {
      return queryInterface.dropTable('Recoveries');
  }
};
