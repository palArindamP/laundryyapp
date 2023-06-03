const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
  const { name, email, password, mobile, state, district, address, pincode } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !mobile ||
    !state ||
    !district ||
    !address ||
    !pincode
  ) {
    return res.status(422).json({
      success: false,
      message: "Please fill all the fields.",
      data: {},
    });
  }

  try {
    const userEmail = await User.findOne({ email: email });
    const userPhone = await User.findOne({ mobile: mobile });
    if (userEmail || userPhone) {
      return res.status(422).json({
        success: false,
        message: "User already Registered.",
        data: {},
      });
    }

    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
      mobile,
      state,
      district,
      address,
      pincode,
    });
    res.json({
      success: true,
      message: "User registered successfully.",
      data: {
        id: userDoc.id,
        name: userDoc.name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, mobile, password } = req.body;

  console.log(req.body);

  if (!password) {
    res.status(400).json({ error: "Please fill proper data." });
    return;
  } else if (!email && !mobile) {
    res.status(400).json({ error: "Please fill email or mobile." });
    return;
  } else {
    console.log(req.body.mobile, req.body.email, req.body.password);
    try {
      const userData = await User.findOne({
        $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
      });

      if (!userData) {
        res.status(404).json({
          success: false,
          message: "User not found!!",
          data: {},
        });
        return;
      }

      console.log("bottom");
      const givenPass = await bcrypt.compareSync(password, userData.password);

      // const convert = bcrypt.hashSync(req.body.password, salt)
      //   console.log(userData.password, givenPass ,convert, req.body.password)
      // const match = await bcrypt.compare(userData.password, userData.password);

      if (givenPass) {
        // send name, id
        res.status(200).json({
          success: true,
          message: "Sucessfully login",
          data: {
            name: userData.name,
            id: userData.id,
          },
        });
      } else {
        // update the message
        res.status(400).json({
          success: false,
          message: "Wrong Credential!!",
          data: {},
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        data: {},
      });
    }
  }
});

module.exports = router;

// {
//   success: Boolean;
//   message: String;
//   data: {}
// }