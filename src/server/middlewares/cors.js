module.exports = (origin, headers) => {
  return (req, res, next) => {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", headers || "Content-Type, Authorization, Content-Language");
    res.header("Author", "Kingsley Victor");
    res.header("Date", new Date());
    res.header("Version", 1.0);
    next();
  };
};
