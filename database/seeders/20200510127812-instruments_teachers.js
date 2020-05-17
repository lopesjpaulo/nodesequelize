'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InstrumentTeachers', [
      {
        instrumentId: 1,
        teacherId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instrumentId: 2,
        teacherId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instrumentId: 3,
        teacherId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instrumentId: 4,
        teacherId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InstrumentTeachers', null, {});
  }
};
