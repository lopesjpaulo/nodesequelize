'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mark',
        lastName: 'One',
        email: 'markone@gmail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
