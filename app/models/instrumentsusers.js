'use strict';
module.exports = (sequelize, DataTypes) => {
  const InstrumentUser = sequelize.define('InstrumentUser', {
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: true,
    paranoid: true
  },{});
  InstrumentUser.associate = function(models) {
    InstrumentUser.belongsTo(models.User, {foreignKey: 'userId'})
    InstrumentUser.belongsTo(models.Instrument, {foreignKey: 'instrumentId'})
  };
  return InstrumentUser;
};