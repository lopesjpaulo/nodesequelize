'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
   return queryInterface.createTable('Users', 
    { 
      id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull:false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      pathImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type:DataTypes.DATE,
        allowNull: true
      }
    }
   );
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Users');
  }
};
