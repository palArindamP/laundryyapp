const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { uuid } = require('uuidv4');
// const mongoose = require("mongoose");
// const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);

const router = express.Router();
router.use(express.json());



router.post("/register", async (req, res) => {
  const { name, email, password, mobile, state, district, address, pincode } = req.body;

  if (!name || !email || !password || !mobile || !state || !district || !address || !pincode ) {
    return res.status(422).json({ error: "Please fill all the fields." })
  }

  try {
    const userEmail = await User.findOne({ email: email});
        const userPhone = await User.findOne({ mobile: mobile});
        if (userEmail || userPhone) {
            return res.status(422).json({ error: "Already exists." })
        } 


    const userDoc = await User.create({
      userId: uuid(),
      name,
      email,
      password: bcrypt.hashSync(password, salt),
      mobile,
      state,
      district,
      address,
      pincode
    });
    res.json({
      success: true,
      message: "User registered successfully.",
      data: {
        id: userDoc.id,
        name: userDoc.name
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// router.post("/login", async (req, res) => {
// //   const mongoose = require("mongoose");
// // const User = require("../models/userSchema");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const secret = "laundry_cart_SN-10X";


//   const { email, mobile, password } = req.body;
  
//   if((email && password) || (mobile && password))
//   try{

//   }
//   }


// module.exports = { loginController };





// /order/:userId

module.exports = router;