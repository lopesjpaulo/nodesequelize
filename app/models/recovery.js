const crypto = require('crypto');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Recovery = sequelize.define('Recovery', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        codigo: {
            type: DataTypes.STRING
        },
        used: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            }
        },
        expiresAt: {
            type: DataTypes.DATE
        },
    },
    {
        classMethods: {

        },
        hooks: {
            beforeCreate: (recovery, options) => {
                recovery.codigo = crypto.randomBytes(4).toString('hex');
                recovery.expiresAt = moment().add(1, 'hours').utc(true);
                //recovery.expiresAt.setHours(recovery.expiresAt.getHours() + 1);
            },
        },
        timestamps: true,
        paranoid: true
    });

    Recovery.associate = function(models) {
        Recovery.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'userId'
        });
    };

    return Recovery;
}
