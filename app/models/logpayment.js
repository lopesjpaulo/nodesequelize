"use strict";
module.exports = (sequelize, DataTypes) => {
    const Logpayment = sequelize.define(
        "Logpayment",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            scheduleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "schedule",
                    key: "id"
                },
                onDelete: "CASCADE"
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
        },
        {
            classMethods: {},
            hooks: {},
            timestamp: true,
            paranoid: true
        }
    );

    Logpayment.associate = function(models) {
        Logpayment.belongsTo(models.Schedule, {
            as: "schedules",
            foreignKey: "scheduleId"
        });
    };

    return Logpayment;
};
