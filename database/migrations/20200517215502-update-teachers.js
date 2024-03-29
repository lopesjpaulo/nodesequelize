'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.addColumn(
        'Teachers',
        'cep',
        {
          type: DataTypes.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Teachers',
        'type',
        {
          type: DataTypes.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Teachers',
        'userId',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          references:{
            model: 'Users',
            key: 'id'
          }
        }
      ),
      queryInterface.addColumn(
        'Teachers',
        'meta',
        {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      ),
    ])

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Teachers',
        'cep'
      ),
      queryInterface.removeColumn(
        'Teachers',
        'type'
      ),
      queryInterface.removeColumn(
        'Teachers',
        'userId'
      ),
      queryInterface.removeColumn(
        'Teachers',
        'meta'
      )
    ]) ;
  }
};
