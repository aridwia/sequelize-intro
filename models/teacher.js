'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Format email tidak sesuai"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Teacher;
};
