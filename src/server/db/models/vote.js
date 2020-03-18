module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define("Vote", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  Vote.associate = ({ Auth, Election }) => {
    Vote.belongsTo(Auth, {
      foreignKey: "voter",
      targetKey: "matric",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
    
    Vote.belongsTo(Auth, {
      foreignKey: "contestant",
      targetKey: "matric",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
    
    Vote.belongsTo(Election, {
      foreignKey: "election",
      targetKey: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  };

  Vote.findByVoterAndElection = (voter, election) => Vote.findOne({
    where: {
      voter,
      election
    }
  });

  Vote.countByContestant = (contestant) => Vote.count({
    where: {
      contestant
    }
  });

  Vote.countByVoter = (voter) => Vote.count({
    where: {
      voter
    }
  });

  return Vote;
};
