const Otps = require("../model/otpModel.js");
const randomstring = require("randomstring");
const { sendEmail } = require("../utils/sendMail.js");

const RESEND_LIMIT = 3;
const TIMEOUT_DURATION = 60 * 60 * 1000;

function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

const sendOTP = async (req, res) => {
  try {
    const { email } = req.query;
    const otp = generateOTP();

    const newOTP = new Otps({
      email,
      otp,
      resendCount: 0,
      lastSentAt: new Date(),
    });
    await newOTP.save();

    await sendEmail({
      to: email,
      subject: "Your OTP",
      message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.query;

    const existingOTP = await Otps.findOneAndDelete({ email, otp });

    if (existingOTP) {
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.query;

    const userOTP = await Otps.findOne({ email });

    if (!userOTP) {
      return res
        .status(400)
        .json({ success: false, error: "No OTP found for this email" });
    }

    const currentTime = new Date();
    const timeDifference = currentTime - new Date(userOTP.lastSentAt);

    if (userOTP.resendCount >= RESEND_LIMIT) {
      if (timeDifference < TIMEOUT_DURATION) {
        const remainingTime = Math.ceil(
          (TIMEOUT_DURATION - timeDifference) / (60 * 1000)
        );
        return res.status(429).json({
          success: false,
          error: `Resend limit reached. Try again in ${remainingTime} minutes.`,
        });
      } else {
        userOTP.resendCount = 0;
      }
    }

    const newOtp = generateOTP();
    userOTP.otp = newOtp;
    userOTP.resendCount += 1;
    userOTP.lastSentAt = currentTime;

    await userOTP.save();

    await sendEmail({
      to: email,
      subject: "Your OTP",
      message: `<p>Your new OTP is: <strong>${newOtp}</strong></p>`,
    });

    res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { sendOTP, verifyOTP, resendOTP };
