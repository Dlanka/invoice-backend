const express = require("express");
const AuthController = require("../controllers/AuthController");
const verifyToken = require("../middlewares/verifyTokenMiddleware");
const validate = require("../middlewares/validate");

//
const userValidator = require("../validators/userValidator");

const router = express.Router();

router.post("/create", validate(userValidator), AuthController.create);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.get("/validate", verifyToken, AuthController.authValidate);
router.post("/logout", AuthController.logout);

module.exports = router;
