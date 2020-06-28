'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Payments', 'paidAt', 'paid_at');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Payments', 'paid_at', 'paidAt');
  }
};
