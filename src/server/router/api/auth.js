const { Router } = require("express");
const { AuthMiddleWare } = require("../../middlewares");
const { AuthController } = require("../../controllers");

const router = Router();

router.post(
  "/add_member",
  AuthMiddleWare.checkToken,
  AuthMiddleWare.checkAdmin,
  AuthController.addMember
);

router.post(
  "/log_member_in",
  AuthController.login
);

router.post(
  "/log_member_out",
  AuthMiddleWare.checkToken,
  AuthController.logout
);

router.get(
  "/get_logged_user",
  AuthMiddleWare.checkToken,
  AuthController.getLoggedUser
);

module.exports = router;
