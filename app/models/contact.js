module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      subject: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      text: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model: 'user',
            key: 'id'
        }
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references : {
            model: 'schedule',
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

  Contact.associate = function(models) {
      Contact.belongsTo(models.User, {
          as: 'users',
          foreignKey: 'userId'
      });
      Contact.belongsTo(models.Schedule, {
        as: 'schedules',
        foreignKey: 'scheduleId'
    });
  };

  return Contact;
}