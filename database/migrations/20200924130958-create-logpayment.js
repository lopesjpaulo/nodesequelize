'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Logpayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'Schedules',
          key: 'id'
        }
      },
      paidBalance: { //Valor pago do saldo existente do aluno
        type: DataTypes.INTEGER,
        defaultValue: 0
      },  
      paidTransaction: { //Valor pago da transação com o cartão de crédito
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      balanceFinal: { //Valor final que sobrou no saldo do aluno, 0 se não sobrar nada
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Logpayments');
  }
};
