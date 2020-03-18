const { Router } = require("express");
const { VoteController } = require("../../controllers");
const { AuthMiddleWare, VoteMiddleWare } = require("../../middlewares");

const router = Router();

router.post(
  "/create/:contestant/:election",
  AuthMiddleWare.checkToken,
  VoteMiddleWare.checkIfAlreadyVoted,
  VoteController.vote
);

module.exports = router;
