const express = require("express");
const { signUp, login } = require("../controller/authController");
const { upload } = require("../middleware/multer");

const authRouter = express.Router();

authRouter.post("/signUp", upload.single("profilePicture"), signUp);
authRouter.post("/login", login);

module.exports = { authRouter };
