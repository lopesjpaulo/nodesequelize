module.exports = (sequelize, DataTypes) => {
    const Avaliability = sequelize.define('Avaliability', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      busy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0'
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teacher',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
  }, {
    classMethods: {

    },
    hooks: {
        
    },
    timestamp: true,
    paranoid: true
  });

  Avaliability.associate = function(models) {
    Avaliability.belongsTo(models.Teacher, {
      as: 'teachers',
      foreignKey: 'teacherId'
    });
  };

  return Avaliability;
};