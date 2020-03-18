module.exports = (sequelize, DataTypes) => {
  const Contest = sequelize.define("Contest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  Contest.associate = ({ Auth, Election }) => {
    Contest.belongsTo(Auth, {
      foreignKey: "contestant",
      targetKey: "matric",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });

    Contest.belongsTo(Election, {
      foreignKey: "election",
      targetKey: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  };

  Contest.findByElection = (election) => Contest.findAll({
    where: {
      election
    }
  });

  Contest.findByElectionAndContestant = (election, contestant) => Contest.findOne({
    where: {
      election,
      contestant
    }
  });

  return Contest;
};
