if (process.env.NODE_ENV !== "production") {
  require("dotenv")
  .config();
}

module.exports = {
  db: {
    development: {
      name: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    },
    test: {
      name: process.env.DB_TEST_NAME,
      username: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASS,
      host: process.env.DB_TEST_HOST,
      port: process.env.DB_TEST_PORT
    },
    production: {
      name: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    }
  },
  port: {
    development: process.env.PORT,
    production: process.env.PORT,
    test: process.env.TEST_PORT
  },
  admin: {
    matric: process.env.ADMIN_MATRIC,
    password: process.env.ADMIN_PASSWORD,
    firstName: process.env.ADMIN_NAME_FIRST,
    lastName: process.env.ADMIN_NAME_LAST
  },
  jwtSecret: process.env.JWT_SECRET
};

