const mongoose = require("mongoose");

const cowDetails = new mongoose.Schema(
  {
    cowName: {
      type: String,
      required : true,
    },
    cowAge: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
    },
    gestation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CowDetails", cowDetails);

//farmer
//cow age
//max capaciy
//breed
//gestration period
//health_status
