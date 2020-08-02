'use strict';
module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        avaliabilityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'avaliability',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references : {
              model: 'user',
              key: 'id'
          },
          onDelete: 'CASCADE'
        },
        instrumentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'instrument',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        cancellationReason: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        originalSchedule: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references : {
                model: 'schedule',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        finishedAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        canceledAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        canceled: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rescheduled: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },{
        classMethods: {

        },
        hooks: {

        },
        timestamp: true,
        paranoid: true
    });

  Schedule.associate = function(models) {
    Schedule.belongsTo(models.Avaliability, {
        as: 'avaliabilities',
        foreignKey: 'avaliabilityId'
    });
    Schedule.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'userId'
    });
      Schedule.belongsTo(models.Instrument, {
          as: 'instruments',
          foreignKey: 'instrumentId'
      });
  };

  return Schedule;
};
