const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    productType: {
      type: String,
      enum: ["500ml", "1000ml"],
      default: "500ml",
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    productImages: [
      {
        img: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    cowType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CowDetails",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
