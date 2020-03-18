const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    matric: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty."
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required."
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    hooks: {
      beforeSave: (model) => {
        if (model.changed("password")) {
          const salt = bcrypt.genSaltSync(10);
          model.password = bcrypt.hashSync(model.password, salt);
        }
      }
    }
  });
};
