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
  };
  
  return Schedule;
};