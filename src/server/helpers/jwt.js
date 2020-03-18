const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../env");

class Jwt {
  static encode(payload) {
    return jwt.sign(payload, jwtSecret);
  }

  static decode(token) {
    return jwt.verify(token, jwtSecret);
  }
}

module.exports = Jwt;
