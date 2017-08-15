'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
    SubjectId: {type: DataTypes.INTEGER, allowNull:true},
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
  Teacher.associate = (models) => {
  Teacher.belongsTo(models.Subject);
  }
  return Teacher;
};
