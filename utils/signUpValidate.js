function validate(
  userName,
  profilePicture,
  pincode,
  address,
  mobileNo,
  email,
  password
) {
  // Validate individual fields (basic validation, can be enhanced as needed)
  if (!userName || typeof userName !== "string") {
    return res.status(400).json({ error: "Invalid or missing userName" });
  }

  if (!profilePicture || typeof profilePicture !== "string") {
    return res.status(400).json({ error: "Invalid or missing profilePicture" });
  }

  if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
    return res.status(400).json({ error: "Invalid or missing pincode" });
  }

  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "Invalid or missing address" });
  }

  if (!mobileNo || !/^[0-9]{10}$/.test(mobileNo)) {
    return res.status(400).json({ error: "Invalid or missing mobileNo" });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid or missing email" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      error:
        "Invalid or missing password. Password must be at least 6 characters long.",
    });
  }
}

module.exports = { validate };
