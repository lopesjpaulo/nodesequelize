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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
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
        timestamps: true,
        paranoid: true
    });

    User.prototype.isPassword = (encodedPassword, password) => {
        return compareSync(password, encodedPassword);
    };

    return User;
}