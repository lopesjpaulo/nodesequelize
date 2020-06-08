'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Avaliabilities', [
        {
          date: '2020-09-26 14:00:00',
          busy: 1,
          teacherId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          date: '2020-09-26 15:00:00',
          busy: 1,
          teacherId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          date: '2020-09-26 16:00:00',
          busy: 0,
          teacherId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          date: '2020-09-26 17:00:00',
          busy: 0,
          teacherId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          date: '2020-09-26 14:00:00',
          busy: 1,
          teacherId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          date: '2020-09-26 15:00:00',
          busy: 1,
          teacherId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          date: '2020-09-26 16:00:00',
          busy: 0,
          teacherId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          date: '2020-09-26 17:00:00',
          busy: 0,
          teacherId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Avaliabilities', null, {});
  }
};
