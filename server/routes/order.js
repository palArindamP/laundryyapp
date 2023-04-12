const express = require('express');
const router = express.Router();

require('../db/connection')
const Order = require('../models/orderSchema')
const User = require('../models/userSchema');

router.post("/", async (req, res) => {
    const { userId, dateOfOrder, locationOfStore, addressOfStore, cityOfStore, phone, statusOfOrder, totalOrderPrice, totalItem, orderedItems, shippingAddress, pincode } = req.body

    console.log(req.body);
    try {
        const tatgetUserId = await User.findOne({ id: userId });
        if (!tatgetUserId) {
            return res.status(404).json({ error: "Not exists." })
        } else {
            const order = new Order({ userId, dateOfOrder, locationOfStore, addressOfStore, cityOfStore, phone, statusOfOrder, totalOrderPrice, totalItem, orderedItems, shippingAddress, pincode })

            const newOrder = await order.save()
            if (newOrder) {
                res.status(201).json({ message: "Sucessfully order placed." })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "some error occured" })
    }
})

router.get("/user/:userId", async (req, res) => {

    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({ error: "No order id provided" })
        }
        const orders = await Order.find({ userId }).select({ "_id": 0, "userId": 1, "orderedItems": 1, "totalItem": 1, "statusOfOrder": 1, "totalOrderPrice": 1});
        res.status(200).json(orders)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "error occer" })
    }
})

module.exports = router;
