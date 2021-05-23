const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already exist",
      });

    const { firstName, lastName, email, password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role : "admin"
    });

    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "admin created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === 'admin') {
        const token = jwt.sign({ _id: user._id,role : user.role}, process.env.JWT_KEY, {
          expiresIn: "5h",
        });
        const { _id , firstName, lastName, email, role } = user;
        res.status(200).json({
          token,
          user: {
              _id,
            firstName,
            lastName,
            email,
            role,
          },
        });
      }
    } else {
      return res.status(400).json({
        message: "something went wrong",
      });
    }
  });
};

exports.requiredSignIn = (req , res , next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token , process.env.JWT_KEY);
    req.user = user;
    // console.log(token);
    next();
}


