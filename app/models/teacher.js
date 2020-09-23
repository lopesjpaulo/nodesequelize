const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
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
        about: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model: 'user',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        balance: {
            type: DataTypes.DECIMAL,
            defaultValue: '0'
        },
        meta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        valueOne: DataTypes.INTEGER,
        valueFive: DataTypes.INTEGER,
        valueTen: DataTypes.INTEGER,
        codeInvite: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        teacherInvite: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        classMethods: {

        },
        hooks: {
            beforeCreate: (teacher, options) => {
                teacher.codeInvite = crypto.randomBytes(4).toString('hex');
            }
        },
        timestamp: true,
        paranoid: true
    });

    Teacher.associate = function(models) {
        Teacher.belongsToMany(models.Instrument, {
            through: 'InstrumentTeacher',
            as: 'instruments',
            foreignKey: 'teacherId',
            otherKey: 'instrumentId'
        });
        Teacher.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'userId'
        });
        Teacher.hasMany(models.Review, {
            as: 'reviews',
            foreignKey: 'teacherId'
        });
        Teacher.hasMany(models.Certified, {
            as: 'certifieds',
            foreignKey: 'teacherId'
        });
    };

    return Teacher;
}
