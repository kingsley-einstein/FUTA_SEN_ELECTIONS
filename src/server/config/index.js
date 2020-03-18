const path = require("path");
const APIRouter = require("../router/api");
const PagesRouter = require("../router/pages");
const { Cors } = require("../middlewares");

module.exports = (app) => {
  return (logger, { urlencoded, json, statics }) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(statics(path.join(__dirname, "../../client/static"), {
      setHeaders: (res, loc, stat) => {
        res.set("Service-Worker-Allowed", "/");
      }
    }));
    app.use(statics(path.join(__dirname, "../../../node_modules")));
    app.use(logger("dev"));
    app.use(Cors("*"));
    app.use("/api/v1", APIRouter);
    app.use("/", PagesRouter);
  };
};
