const { Contest } = require("../db");

class ContestController {
  static async contest(req, res) {
    try {
      const { user, params } = req;
      const body = await Contest.create({
        contestant: user.matric,
        election: params.electionId
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

  static async rescind(req, res) {
    try {
      const { contestant, election } = req.params;
      const destroyed = await Contest.destroy({
        where: {
          contestant,
          election
        }
      });
      res.status(200).json({
        statusCode: 200,
        body: `${destroyed} item(s) removed`
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}

module.exports = ContestController;
