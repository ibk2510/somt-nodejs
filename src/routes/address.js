const express = require("express");
const router = express.Router();
const { requiredSignIn, adminMiddleware } = require("../commonMiddlewares");
const { createAddress, getAddress } = require("../controller/address");
router.post("/address/create", requiredSignIn, createAddress);
router.get("/address/get", requiredSignIn , getAddress);

module.exports = router;