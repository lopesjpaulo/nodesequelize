module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
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

    Category.associate = function(models) {
        Category.hasMany(models.Instrument, {as: 'instruments', foreignKey: 'categoryId'})
    };
    //Category.hasMany(Instrument,{as: 'instruments', foreignKey: 'categoryId'})

    return Category;
}