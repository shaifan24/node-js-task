const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const signUp = async (req, res) => {
  try {
    // const requiredFields = [
    //   "userName",
    //   "pincode",
    //   "address",
    //   "mobileNo",
    //   "email",
    //   "password",
    // ];

    // const missingFields = requiredFields.filter((field) => !req.body[field]);
    // if (missingFields.length > 0) {
    //   return res.status(400).json({
    //     error: "Missing required fields",
    //     missingFields,
    //   });
    // }

    const { userName, pincode, address, mobileNo, email, password } = req.body;

    const profilePicture = req.file ? req.file.filename : null;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userName,
      profilePicture: profilePicture ? `/uploads/${profilePicture}` : null,
      pincode,
      address,
      mobileNo,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    console.error("Error during sign-up:", err);
    res.status(500).json({
      error: "An internal server error occurred",
      details: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signUp, login };
