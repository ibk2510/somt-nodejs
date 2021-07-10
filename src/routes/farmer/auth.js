const express = require("express");
const { requiredSignIn } = require("../../commonMiddlewares");
const { signup , signin } = require("../../controller/farmer/auth");
const { validateSignupRequest, isrequestValidated } = require("../../validators/auth");
const router = express.Router();

router.post("/farmer/signup", validateSignupRequest, isrequestValidated, signup);

router.post("/farmer/signin", signin);

router.post("/farmer/profile", requiredSignIn, (req, res) => {
  res.status(200).json({
    message: "profile view",
  });
});

module.exports = router;
