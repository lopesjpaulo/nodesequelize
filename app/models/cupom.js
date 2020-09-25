module.exports = (sequelize, DataTypes) => {
    const Cupom = sequelize.define('Cupom', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scheduleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
              model: 'Schedules',
              key: 'id'
            }
        },
        expiresAt: {
            type: DataTypes.DATE
        },
    },
    {
        classMethods: {

        },
        hooks: {
            
        },
        timestamps: true,
        paranoid: true
    });

    Cupom.associate = function(models) {
        Cupom.belongsTo(models.Schedule, {
            as: 'schedules',
            foreignKey: 'scheduleId'
        });
    };

    return Cupom;
}
