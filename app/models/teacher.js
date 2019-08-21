const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
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
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        balance: {
            type: DataTypes.DECIMAL,
            defaultValue: '0'
        },
        value_one: DataTypes.DECIMAL,
        value_five: DataTypes.DECIMAL,
        value_ten: DataTypes.DECIMAL
    },
    {   
        classMethods: {

        },
        hooks: {
            beforeCreate: (user, options) => {
                const salt = genSaltSync();
                user.password = hashSync(user.password, salt);
            }
        },
        timestamp: true,
        paranoid: true
    });
    
    Teacher.prototype.isPassword = (encodedPassword, password) => {
        return compareSync(password, encodedPassword);
    };

    return Teacher;
}