'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', [
      {
        birthday: '11/11/2001',
        phone: '(84) 92929-9991',
        state: 'RN',
        city: 'Parnamirim',
        cpf: '123.456.789-00',
        cep: '59.143-280',
        about: 'Sobre teste 123',
        userId: '1',
        type: 'Profissional',
        valueOne: '60.0',
        valueFive: '270.0',
        valueTen: '540.0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        birthday: '11/11/2000',
        phone: '(84) 92929-8888',
        state: 'RN',
        city: 'Natal',
        cpf: '123.456.789-01',
        cep: '59.143-280',
        about: 'Sobre teste 2',
        userId: '2',
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
