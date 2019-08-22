'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('instruments', [
      {
        title: 'Violão',
        categoryId: '1'
      },
      {
        title: 'Cavaquinho',
        categoryId: '1'
      },
      {
        title: 'Piano',
        categoryId: '3'
      },
      {
        title: 'Bateria',
        categoryId: '2'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('instruments', null, {});
  }
};
