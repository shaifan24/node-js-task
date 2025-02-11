const { body, validationResult } = require("express-validator");

const validateSignUp = [
  body("userName")
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  body("mobileNo").isMobilePhone().withMessage("Invalid mobile number"),

  body("pincode")
    .isNumeric()
    .withMessage("Pincode must be numeric")
    .isLength({ min: 5, max: 6 })
    .withMessage("Pincode must be between 5 to 6 digits"),

  body("address").notEmpty().withMessage("Address is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateSignUp };
