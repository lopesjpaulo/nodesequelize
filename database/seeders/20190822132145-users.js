'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        birthday: '01/01/1990',
        state: 'RN',
        city: 'Natal',
        password: '12345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mark One',
        email: 'markone@gmail.com',
        birthday: '10/10/1980',
        state: 'PB',
        city: 'João Pessoa',
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
