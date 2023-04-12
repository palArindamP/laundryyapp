let mongoose = require("mongoose");

let orderedProductSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
      enum: ["Shirt", "Pant", "T-Shirt", "Trouser"],
    },
    image: { type: String, required: true },
    washDetails: [
      {
        operationName: {
          type: String,
          required: true,
          enum: ["ChemicalWash", "DryingClean", "Washing", "Ironing"],
        },
        washprice: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

let products = mongoose.model("products", orderedProductSchema);

module.exports = products;