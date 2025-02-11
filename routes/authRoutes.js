const express = require("express");
const { signUp, login } = require("../controller/authController");
const { upload } = require("../middleware/multer");
const { validateSignUp } = require("../middleware/validator");

const authRouter = express.Router();

authRouter.post(
  "/signUp",
  upload.single("profilePicture"),
  validateSignUp,
  signUp
);
authRouter.post("/login", login);

module.exports = { authRouter };
