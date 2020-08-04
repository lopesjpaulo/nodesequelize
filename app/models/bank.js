module.exports = (sequelize, DataTypes) => {
    const Bank = sequelize.define('Bank', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        label: {
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
            
        },
        timestamp: true,
        paranoid: true
    });

    return Bank;
}