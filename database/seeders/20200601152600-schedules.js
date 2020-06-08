'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Schedules', [
        {
          avaliabilityId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          avaliabilityId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          avaliabilityId: 5,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          avaliabilityId: 6,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Schedules', null, {});
  }
};
