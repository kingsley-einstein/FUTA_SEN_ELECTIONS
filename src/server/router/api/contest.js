const { Router } = require("express");
const { ContestController } = require("../../controllers");
const { AuthMiddleWare, ContestMiddleWare } = require("../../middlewares");

const router = Router();

router.post(
  "/create/:electionId",
  AuthMiddleWare.checkToken,
  ContestMiddleWare.checkIfContested,
  ContestController.contest
);

router.delete(
  "/rescind/:contestant/:election",
  AuthMiddleWare.checkToken,
  ContestMiddleWare.checkIfOwnerOfContest,
  ContestController.rescind
);

module.exports = router;
