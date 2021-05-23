const jwt = require("jsonwebtoken");

exports.requiredSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    // console.log(user._id + " user");
    req.user = user;
  } else {
    return res.status(400).json({
      message: "Authorization required",
    });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
    // console.log(req.user);
  if (req.user.role !== "admin") {
    return res.status(400).json({
      message: "Admin Access denied",
    });
  }
  next();
};
