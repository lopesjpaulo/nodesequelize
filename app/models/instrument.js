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
            through: 'InstrumentUser',
            as: 'users',
            foreignKey: 'instrumentId',
            otherKey: 'userId'
        });
        Instrument.belongsToMany(models.Teacher, {
            through: 'InstrumentTeacher',
            as: 'teachers',
            foreignKey: 'instrumentId',
            otherKey: 'teacherId'
        });
        Instrument.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'categoryId'
        });
        Instrument.hasMany(models.Schedule, {
            as: 'schedules',
            foreignKey: 'instrumentId'
        });
    };

    return Instrument;
}
