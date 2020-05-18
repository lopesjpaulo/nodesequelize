'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users', 
        'pathImage', 
        {
          type: DataTypes.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'Users', 
        'lastname', 
        {
          type: DataTypes.STRING,
          allowNull: false
        }
      ),
    ]) 
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'pathImage'
      ),
      queryInterface.removeColumn(
        'Users',
        'lastname'
      ),
    ]) 
  }
};
