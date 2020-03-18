const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const router = Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../client/index.html"));
});

router.get("/statics", (req, res) => {
  const json = {};
  const p = "../../../client/views";
  const dirs = fs.readdirSync(path.join(__dirname, p));
  const mappedDirs = dirs.map((v) => {
    return path.join(__dirname, p, v);
  });
  mappedDirs.forEach((v) => {
    if (fs.lstatSync(v).isDirectory()) {
      const arr = v.split("\\");
      const name = arr[arr.length - 1];
      json[name] = {};
      fs.readdirSync(v).forEach((s) => {
        if (fs.lstatSync(path.join(v, s)).isFile()) {
          json[name][path.basename(path.join(v, s), ".html")] = fs.readFileSync(path.join(v, s)).toString();
        }
      });
    }
  });
  res.status(200).json(json);
});

module.exports = router;
