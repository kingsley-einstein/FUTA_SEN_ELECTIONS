const { Vote } = require("../db");

class VoteController {
  static async vote(req, res) {
    try {
      const { user, params } = req;
      const body = await Vote.create({
        voter: user.matric,
        contestant: params.contestant,
        election: params.election
      });
      res.status(201).json({
        statusCode: 201,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}

module.exports = VoteController;
