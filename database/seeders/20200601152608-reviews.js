'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        scheduleId: 1,
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        scheduleId: 2,
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        scheduleId: 3,
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        scheduleId: 4,
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
