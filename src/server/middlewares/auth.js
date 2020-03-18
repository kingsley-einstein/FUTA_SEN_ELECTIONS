const { Token, Auth } = require("../db");
const { Jwt } = require("../helpers");

class AuthWare {
  static async checkToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        statusCode: 401,
        body: "Authorization header not present in request"
      });
      return;
    }
    if (!authorization.startsWith("Bearer")) {
      res.status(401).json({
        statusCode: 401,
        body: "Authorization header must begin with 'Bearer' string"
      });
      return;
    }
    const token = authorization.substring(7, authorization.length);
    if (!token || token.trim().length === 0) {
      res.status(401).json({
        statusCode: 401,
        body: "Token not found in authorization header"
      });
      return;
    }
    const isLoggedOut = await Token.findByActual(token);
    if (isLoggedOut) {
      res.status(401).json({
        statusCode: 401,
        body: "Only logged in users can access this resource."
      });
      return;
    }
    const payload = Jwt.decode(token);
    if (!payload) {
      res.status(401).json({
        statusCode: 401,
        body: "Token is invalid."
      });
      return;
    }
    const user = await Auth.findByPk(payload.matric);
    req.user = user;
    req.token = token;
    next();
  }

  static async checkAdmin(req, res, next) {
    try {
      const { user } = req;
      if (!user.isAdmin) {
        res.status(400).json({
          statusCode: 400,
          body: "Only an admin can access this resource."
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

module.exports = AuthWare;
