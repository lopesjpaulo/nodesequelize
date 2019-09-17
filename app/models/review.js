'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
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

  Review.associate = function(models) {
    Review.belongsTo(models.Schedule, {
      as: 'schedules',
      foreignKey: 'scheduleId'
    });
  };

  return Review;
};