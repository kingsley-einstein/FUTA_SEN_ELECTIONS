module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    actual: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Actual token is required."
        }
      }
    }
  });

  Token.findByActual = (actual) => Token.findOne({
    where: {
      actual
    }
  });

  return Token;
};
