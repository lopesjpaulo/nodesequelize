'use strict';
module.exports = (sequelize, DataTypes) => {
  const InstrumentTeacher = sequelize.define('InstrumentTeacher', {
    id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    instrumentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, 
  {
    timestamps: true,
    paranoid: true
  }, {});
  InstrumentTeacher.associate = function(models) {
    InstrumentTeacher.belongsTo(models.Teacher, {foreignKey: 'teacherId'})
    InstrumentTeacher.belongsTo(models.Instrument, {foreignKey: 'instrumentId'})
  };
  return InstrumentTeacher;
};