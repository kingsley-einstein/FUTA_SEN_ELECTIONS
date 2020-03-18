const { Vote } = require("../db");

class VoteMiddleWare {
  static async checkIfAlreadyVoted(req, res, next) {
    try {
      const { user, params } = req;
      const vote = await Vote.findByVoterAndElection(user.matric, params.election);
      if (vote) {
        res.status(400).json({
          statusCode: 400,
          body: "You already voted."
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

module.exports = VoteMiddleWare;
