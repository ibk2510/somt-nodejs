const express = require("express");
const router = express.Router();
const {
  subscribe,
  getAllSubscribtions,
} = require("../controller/subscription");
const { requiredSignIn, adminMiddleware } = require("../commonMiddlewares");

router.post("/subscribe", requiredSignIn, subscribe);
router.get(
  "/subscribe/getall",
  requiredSignIn,
  adminMiddleware,
  getAllSubscribtions
);

module.exports = router;
