'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        title: 'Corda',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Percussão',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Teclas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
