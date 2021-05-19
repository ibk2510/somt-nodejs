const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("FirstName is Required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("Enter the Valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Enter valid password of length"),
];

exports.isrequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
