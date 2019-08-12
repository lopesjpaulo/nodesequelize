module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        cpf: DataTypes.STRING,
        balance: DataTypes.DECIMAL,
        value_one: DataTypes.DECIMAL,
        value_five: DataTypes.DECIMAL,
        value_ten: DataTypes.DECIMAL
    });

    return Teacher;
}