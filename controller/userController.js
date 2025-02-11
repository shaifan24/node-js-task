const User = require("../model/userModel");

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Update User by ID
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, pincode, address, mobileNo, email } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        userName,
        profilePicture: profilePicture ? `/uploads/${profilePicture}` : null,
        pincode,
        address,
        mobileNo,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { getUserById, updateUserById };
