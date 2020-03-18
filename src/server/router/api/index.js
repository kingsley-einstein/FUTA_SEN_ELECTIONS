const { Router } = require("express");
const AuthRouter = require("./auth");
const ElectionRouter = require("./election");
const ContestRouter = require("./contest");
const VoteRouter = require("./vote");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    body: {
      message: "This is the main API",
      prefix: "/api/v1",
      sub_prefixes: ["/auth/**", "/election/**", "/contest/**"]
    }
  });
});

router.use("/auth", AuthRouter);
router.use("/election", ElectionRouter);
router.use("/contest", ContestRouter);
router.use("/vote", VoteRouter);

module.exports = router;
