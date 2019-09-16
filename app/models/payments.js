'use strict';
module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define('payments', {
    paid_at: DataTypes.DATE
  }, {});
  payments.associate = function(models) {
    // associations can be defined here
  };
  return payments;
};