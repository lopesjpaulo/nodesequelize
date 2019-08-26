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
                model: 'category',
                key: 'id'
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

    Instrument.associate = function(models) {
        Instrument.belongsTo(models.Category, {foreignKey: 'categoryId', as: 'categories'})
    }

    return Instrument;
}