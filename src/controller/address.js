const Address = require("../models/AddressDetails");

exports.createAddress = (req, res) => {
  const { doorNo, streetName, city, state, pincode } = req.body;

  const _address = new Address({
    doorNo,
    streetName,
    city,
    state,
    pincode,
    user: req.user,
  });

  _address.save((err, data) => {
    if (err) {
      return res.status(404).json({
        msg: err,
      });
    }
    return res.status(200).json({
      msg: data,
    });
  });
};

exports.getAddress = (req, res) => {
  Address.find({ user: req.user._id }, (err, data) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }
    return res.status(200).json({
      data: data,
    });
  });
};
