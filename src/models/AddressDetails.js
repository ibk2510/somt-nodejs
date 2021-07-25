const mongoose = require("mongoose");

const addressDetails = new mongoose.Schema(
  {
    doorNo: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AddressDetails' , addressDetails);