const { Auth } = require("../db");
const { admin: { firstName, lastName, matric, password } } = require("../env");

module.exports = async () => {
  const isExisting = await Auth.findByPk(matric);
  if (!isExisting) {
    const admin = await Auth.create({ firstName, lastName, matric, password, isAdmin: true });
    console.log("Admin account created: ", admin);
  }
}
