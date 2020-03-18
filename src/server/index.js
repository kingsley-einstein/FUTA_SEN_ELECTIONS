const express = require("express");
const configure = require("./config");
const { port } = require("./env");
const { sequelize } = require("./db");
// const http = require("http");
const IO = require("socket.io");
const { Socket, createAdmin } = require("./helpers");
const app = express();

const opts = {
  urlencoded: express.urlencoded,
  json: express.json,
  statics: express.static
};

const config = (cb) => {
  cb(require("morgan"), opts);
};

config(configure(app));

const server = app.listen(port[process.env.NODE_ENV], () => {
  console.log(`Server is running on port ${port[process.env.NODE_ENV]}`);
  // const s = http.createServer(server);
  const io = IO(server);
  Socket(io);
  sequelize.sync({}).then( async () => {
    console.log("Connection made to db");
    await createAdmin();
  });
});
