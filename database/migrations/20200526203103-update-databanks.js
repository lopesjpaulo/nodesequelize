'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.addColumn(
        'Databanks', 
        'bank_account_id', 
        {
          type: DataTypes.STRING,
          allowNull: false
        }
      );
  },

  down: (queryInterface, DataTypes) => {
      return queryInterface.removeColumn(
        'Databanks',
        'bank_account_id'
      )
  }
};
