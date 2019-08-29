module.exports = (sequelize, DataTypes) => {
    const Instrument = sequelize.define('Instrument', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'categoriy',
                key: 'id'
            },
            onDelete: 'CASCADE'
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

    Instrument.associate = function(models) {
        Instrument.belongsToMany(models.User, {
            through: 'instruments_users',
            as: 'users',
            foreignKey: 'instrumentId'
        });
        Instrument.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'categoryId'
        });
    };

    return Instrument;
}