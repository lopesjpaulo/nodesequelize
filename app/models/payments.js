'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references : {
          model: 'schedule',
          key: 'id'
      },
      onDelete: 'CASCADE'
    },
    paidAt: {
      type: DataTypes.DATE,
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

  Payment.associate = function(models) {
    Payment.belongsTo(models.Schedule, {
      as: 'schedules',
      foreignKey: 'scheduleId'
    });
  };
  
  return Payment;
};