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
            paidBalance: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },  
            paidTransaction: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            balanceFinal: {
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
