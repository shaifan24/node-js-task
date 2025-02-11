const express = require("express");
const { getUserById, updateUserById } = require("../controller/userController");
const { authenticate } = require("../middleware/auth");
const { upload } = require("../middleware/multer");
const { validateSignUp } = require("../middleware/validator");

const userRouter = express.Router();

userRouter.get("/getUser/:id", authenticate, getUserById);

userRouter.put(
  "/updateUser/:id",
  authenticate,
  upload.single("profilePicture"),
  validateSignUp,
  updateUserById
);

module.exports = { userRouter };
