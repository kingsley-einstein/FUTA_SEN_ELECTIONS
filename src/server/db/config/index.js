const { db } = require("../../env");

module.exports = {
  development: {
    host: db.development.host,
    port: parseInt(db.development.port),
    username: db.development.username,
    password: db.development.password,
    database: db.development.name,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  test: {
    host: db.test.host,
    port: parseInt(db.test.port),
    username: db.test.username,
    password: db.test.password,
    database: db.test.name,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: true
    }
  },
  production: {
    host: db.production.host,
    port: parseInt(db.production.port),
    username: db.production.username,
    password: db.production.password,
    database: db.production.name,
    dialect: "postgres",
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  }
};
