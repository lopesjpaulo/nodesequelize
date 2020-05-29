'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return Promise.all([
            queryInterface.addColumn(
                'Schedules',
                'canceled',
                {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                }
            ),
            queryInterface.addColumn(
                'Schedules',
                'rescheduled',
                {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                }
            ),
            queryInterface.addColumn(
                'Schedules',
                'canceledAt',
                {
                    type: DataTypes.DATE,
                    allowNull: true
                }
            ),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Schedules',
                'canceled'
            ),
            queryInterface.removeColumn(
                'Schedules',
                'rescheduled'
            ),
            queryInterface.removeColumn(
                'Schedules',
                'canceledAt'
            ),
        ])
    }
};
