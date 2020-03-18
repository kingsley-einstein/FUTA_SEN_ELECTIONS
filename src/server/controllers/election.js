const { Election } = require("../db");

class ElectionController {
  static async createElection(req, res) {
    try {
      const { body } = req;
      const data = await Election.create(body);
      res.status(201).json({
        statusCode: 201,
        body: data
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async editElection(req, res) {
    try {
      const { body, params } = req;
      const id = params.electionId;
      const [, [ updated ]] = await Election.update(body, {
        where: {
          id
        }
      });
      res.status(200).json({
        statusCode: 200,
        body: updated
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async deleteElection(req, res) {
    try {
      const { electionId } = req.params;
      const body = await Election.destroy({
        where: {
          id: electionId
        }
      });
      res.status(200).json({
        statusCode: 200,
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

module.exports = ElectionController;
