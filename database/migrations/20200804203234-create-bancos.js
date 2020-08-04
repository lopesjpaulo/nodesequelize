'use strict';

module.exports = {
  up: (queryInterface, Datatypes) => {
      return queryInterface.createTable('Banks', { 
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        value: {
            type: Datatypes.STRING
        },
        label: {
            type: Datatypes.STRING
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Banks');
  }
};
