const express = require("express");
const userRouter = require("./user");
const orderRouter = require("./order");
const productRouter = require("./product")

const router = express.Router();

router.use('/user', userRouter);

router.use('/order', orderRouter);

router.use('/product', productRouter)

module.exports = router;