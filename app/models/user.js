const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        pathImage: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        playerId: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        validEmail: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        statusEmail: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        classMethods: {

        },
        hooks: {
            beforeCreate: (user, options) => {
                if(user.password) {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);
                }
                user.validEmail = crypto.randomBytes(4).toString('hex');
            }
        },
        timestamps: true,
        paranoid: true
    });

    User.associate = function(models) {
        User.belongsToMany(models.Instrument, {
            through: 'InstrumentUser',
            as: 'instruments',
            foreignKey: 'userId',
            otherKey: 'instrumentId'
        });
    };

    User.prototype.isPassword = (encodedPassword, password) => {
        return compareSync(password, encodedPassword);
    };

    return User;
}
