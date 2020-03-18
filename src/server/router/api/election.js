const { Router } = require("express");
const { ElectionController } = require("../../controllers");
const { AuthMiddleWare } = require("../../middlewares");

const router = Router();

router.post(
  "/create",
  AuthMiddleWare.checkToken,
  AuthMiddleWare.checkAdmin,
  ElectionController.createElection
);

router.patch(
  "/edit/:electionId",
  AuthMiddleWare.checkToken,
  AuthMiddleWare.checkAdmin,
  ElectionController.editElection
);

router.delete(
  "/delete/:electionId",
  AuthMiddleWare.checkToken,
  AuthMiddleWare.checkAdmin,
  ElectionController.deleteElection
);

module.exports = router;
