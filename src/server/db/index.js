const { Sequelize, DataTypes } = require("sequelize");
const models = require("./models");
const config = require("./config");

const sequelize = new Sequelize(
  config[process.env.NODE_ENV]
);

const db = { sequelize };

Object.keys(models).forEach((key) => {
  db[key] = models[key](sequelize, DataTypes);
});

Object.keys(db).forEach((key) => {
  if (db[key].associate) {
    db[key].associate(db);        
  }
});

module.exports = db;
