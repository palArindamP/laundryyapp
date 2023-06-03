const express = require("express");
const router = express.Router();

require("../db/connection");
const Order = require("../models/orderSchema");
const User = require("../models/userSchema");

router.post("/", async (req, res) => {
  const {
    userId,
    dateOfOrder,
    totalOrderPrice,
    totalItem,
    orderedItems,
    shippingAddress,
    pincode,
  } = req.body;

  if (!userId) {
    return res.status(404).json({ error: "USer id is required." });
  }
  if (orderedItems && orderedItems.length < 1) {
    return res.status(404).json({ error: "Order items are required." });
  }
  try {
    const tatgetUserId = await User.findOne({ id: userId });
    if (!tatgetUserId) {
      return res.status(404).json({ error: "Not exists." });
    } else {
      const order = new Order({
        userId,
        dateOfOrder,
        totalOrderPrice,
        totalItem,
        orderedItems,
        shippingAddress,
        pincode,
      });

      const newOrder = await order.save();
      if (newOrder) {
        res.status(201).json({ message: "Order placed successfully." });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "some error occurred" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "No order id provided" });
    }
    const orders = await Order.find({ userId })
      .select({
        _id: 1,
        userId: 1,
        orderedItems: 1,
        totalItem: 1,
        statusOfOrder: 1,
        totalOrderPrice: 1,
        dateOfOrder: 1,
        shippingAddress: 1,
        pincode: 1,
      })
      .sort({ dateOfOrder: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Sever error" });
  }
});

router.patch("/user/:userId", async (req, res) => {
  const { orderId } = req.body;
  const { userId } = req.params;
  if (!orderId || !userId) {
    return res.status(400).json({ error: "Insufficient data!!" });
  }
  try {
    const orders = await Order.updateOne(
      { _id: orderId, userId },
      {
        $set: {
          statusOfOrder: 0,
        },
      }
    );
    const updatedOrders = await Order.find({ userId })
      .select({
        _id: 1,
        userId: 1,
        orderedItems: 1,
        totalItem: 1,
        statusOfOrder: 1,
        totalOrderPrice: 1,
        dateOfOrder: 1,
        shippingAddress: 1,
        pincode: 1,
      })
      .sort({ dateOfOrder: -1 });

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrders,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;