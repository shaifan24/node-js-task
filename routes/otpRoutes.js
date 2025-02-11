const express = require("express");
const {
  sendOTP,
  verifyOTP,
  resendOTP,
} = require("../controller/otpController");

const otpRouter = express.Router();

otpRouter.post("/sendOTP", sendOTP);
otpRouter.get("/verifyOTP", verifyOTP);
otpRouter.post("/resendOTP", resendOTP);

module.exports = { otpRouter };
