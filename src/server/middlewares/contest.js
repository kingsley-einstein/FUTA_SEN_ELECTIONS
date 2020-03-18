const { Contest } = require("../db");

class ContestMiddleWare {
  static async checkIfContested(req, res, next) {
    try {
      const { user, params } = req;
      const contest = await Contest.findByElectionAndContestant(params.electionId, user.matric);
      if (contest) {
        res.status(400).json({
          statusCode: 400,
          body: "You are already contesting for this position."
        });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async checkIfOwnerOfContest(req, res, next) {
    try {
      const { user, params } = req;
      if (user.matric != params.contestant) {
        res.status(400).json({
          statusCode: 400,
          body: "You can't rescind another person's contest"
        });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}

module.exports = ContestMiddleWare;
