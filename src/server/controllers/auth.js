const bcrypt = require("bcryptjs");
const { Auth, Token } = require("../db");
const { Jwt } = require("../helpers");

class AuthController {
  static async addMember(req, res) {
    try {
      const { body } = req;
      const { matric, firstName, lastName, isAdmin } = await Auth.create(body);
      const data = { matric, firstName, lastName, isAdmin };
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

  static async login(req, res) {
    try {
      const { matric, password } = req.body;
      const member = await Auth.findByPk(matric);
      if (!member) {
        res.status(404).json({
          statusCode: 404,
          body: `Student with matric number ${matric} not found`
        });
        return;
      }
      if (!bcrypt.compareSync(password, member.password)) {
        res.status(400).json({
          statusCode: 400,
          body: "Incorrect password"
        });
        return;
      }
      const { firstName, lastName, isAdmin } = member;
      const body = { matric, firstName, lastName, isAdmin, token: Jwt.encode({ matric, password: member.password }) };
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

  static async logout(req, res) {
    try {
      const { user, token } = req;
      const actual = token;
      const isLoggedOut = await Token.create({ actual });
      if (!isLoggedOut) {
        res.status(400).json({
          statusCode: 400,
          body: `Unable to sign out ${user.matric}`
        });
        return;
      }
      res.status(200).json({
        statusCode: 200,
        body: `Successfully signed out user ${user.matric}` 
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async getLoggedUser(req, res) {
    try {
      const { firstName, lastName, matric, isAdmin } = req.user;
      const body = { firstName, lastName, matric, isAdmin };
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

module.exports = AuthController;
