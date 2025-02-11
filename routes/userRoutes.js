const express = require("express");
const { getUserById, updateUserById } = require("../controller/userController");
const { authenticate } = require("../middleware/auth");
const { upload } = require("../middleware/multer");

const userRouter = express.Router();

userRouter.get("/getUser/:id", authenticate, getUserById);
userRouter.put(
  "/updateUser/:id",
  authenticate,
  upload.single("profilePicture"),
  updateUserById
);

module.exports = { userRouter };
