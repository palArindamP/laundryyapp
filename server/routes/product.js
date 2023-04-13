const express = require('express');
const router = express.Router();

require('../db/connection')

const Product = require("../models/productSchema");
const { post } = require('./user');
const { create } = require('../models/userSchema');


router.post("/create", async(req, res)=>{
    const {itemName, washDetails} = req.body
    console.log(itemName, washDetails)

   const productDoc = await Product.create({
    itemName, 
    washDetails

   })

   res.json({
    success: true,
    message: "Product exists.",
    data: {
      itemName: productDoc.itemName,
      washDetails: productDoc.washDetails
    }
  });
})

router.get("/", async(req, res)=>{

   const productDoc = await Product.find().select({itemName:1, washDetails:1});


   if(!productDoc.length) {
    res.json({
      success: true,
      message: "No product data found",
      data: []
    }).status(404);
   }

   res.json({
    success: true,
    message: "Sucessfully fetched product data.",
    data: productDoc
  });
})

// /create

// req.body = {
//     itemName: "Shirt",
//     image: "",
//     washDetails: [
//         {
//             operationName: "ChemicalWash",
//             washprice:  10
//         },
//         {
//             operationName: string,
//             washprice:  number
//         },
//         {
//             operationName: "Washing",
//             washprice:  20
//         },
//         {
//             operationName: string,
//             washprice:  number
//         }
//     ]
// }


module.exports = router;

