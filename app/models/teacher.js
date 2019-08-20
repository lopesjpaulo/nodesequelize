module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
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
        timestamp: true,
        paranoid: true
    });

    return Teacher;
}