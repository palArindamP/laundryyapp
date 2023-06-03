let mongoose = require("mongoose");
let schema = mongoose.Schema;
let ObjectId = schema.ObjectId;

let orderSchema = new schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    dateOfOrder: {
      type: String,
      default: Date.now(),
    },

    locationOfStore: {
      type: String,
      default: "New Town",
    },
    addressOfStore: {
      type: String,
      default: "Kolkata",
    },
    cityOfStore: {
      type: String,
      default: "Kolkata",
    },
    phone: {
      type: String,
      default: "+91 8888888888",
    },
    statusOfOrder: {
      type: Boolean,
      default: 1,
    },
    totalOrderPrice: {
      type: Number,
      required: true,
    },
    totalItem: {
      type: Number,
      required: true,
    },
    orderedItems: [
      {
        productType: {
          type: String,
          required: true,
        },
        typeOfWash: {
          type: Array,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        productCost: {
          type: Array,
          required: true,
        },
        totalProductPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
      default: "Delhi",
    },

    pincode: {
      type: Number,
      required: true,
      default: "700101",
    },
  },
  { timestamps: true }
);

let orders = mongoose.model("order", orderSchema);

module.exports = orders