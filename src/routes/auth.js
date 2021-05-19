const express = require("express");
const { signup, signin, requiredSignIn } = require("../controller/auth");
const { validateSignupRequest, isrequestValidated } = require("../validators/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isrequestValidated, signup);

router.post("/signin", signin);

router.post("/profile", requiredSignIn, (req, res) => {
  res.status(200).json({
    message: "profile view",
  });
});

module.exports = router;
