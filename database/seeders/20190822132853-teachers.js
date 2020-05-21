'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', [
      {
        name: 'Teacher one',
        email: 'teacherone@gmail.com',
        birthday: '11/11/2001',
        phone: '(84) 92929-9991',
        state: 'RN',
        city: 'Parnamirim',
        cpf: '123.456.789-00',
        about: 'Sobre teste 123',
        userId: '2',
        type: 'Profissional',
        valueOne: '60.0',
        valueFive: '270.0',
        valueTen: '540.0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Teacher two',
        email: 'teachertwo@gmail.com',
        birthday: '11/11/2000',
        phone: '(84) 92929-8888',
        state: 'RN',
        city: 'Natal',
        cpf: '123.456.789-01',
        about: 'Sobre teste 2',
        userId: '3',
        type: 'Autodidata',
        valueOne: '100.0',
        valueFive: '475.0',
        valueTen: '900.0',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
