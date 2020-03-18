module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Election", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "What position is this election for?"
        }
      }
    }
  });
};