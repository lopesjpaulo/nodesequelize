module.exports = (sequelize, DataTypes) => {
  const Certified = sequelize.define('Certified', {
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
      path: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      teacherId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references : {
              model: 'teacher',
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

  Certified.associate = function(models) {
      Certified.belongsTo(models.Teacher, {
          as: 'teachers',
          foreignKey: 'teacherId'
      });
  };

  return Certified;
}