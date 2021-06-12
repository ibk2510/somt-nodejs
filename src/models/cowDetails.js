const mongoose = require("mongoose");

const cowDetails = new mongoose.Schema(
  {
    cowName: {
      type: String,
      required,
    },
    age: {
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
    gesation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.Model("CowDetails", cowDetails);

//farmer
//cow age
//max capaciy
//breed
//gestration period
//health_status
