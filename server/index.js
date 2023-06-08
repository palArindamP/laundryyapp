require("dotenv").config();

const db = require("./db/connection");
const express = require("express");
const router = require("./routes");
const cors = require("cors");

const app = express();

var whitelist = ['http://localhost:3000', 'https://ui1.onrender.com']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//parser
app.use(cors(corsOptions));
app.use(express.json());


//dbconnection
db();


app.use('/api', router)

const port = process.env.PORT;
//express server
app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
  });