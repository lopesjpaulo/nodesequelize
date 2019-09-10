'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InstrumentUsers', [
      {
        instrumentId: 1,
        userId: 1,
      },
      {
        instrumentId: 2,
        userId: 1,
      },
      {
        instrumentId: 3,
        userId: 2,
      },
      {
        instrumentId: 4,
        userId: 2,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InstrumentUsers', null, {});
  }
};
