const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

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
