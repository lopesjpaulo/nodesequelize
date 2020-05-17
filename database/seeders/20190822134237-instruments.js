'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Instruments', [
      {
        title: 'Violão',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cavaquinho',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Piano',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bateria',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Instruments', null, {});
  }
};
