require("dotenv").config();

const db = require("./db/connection");
const express = require("express");
const router = require("./routes");

const app = express();

//parser
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());


//dbconnection
db();


app.use('/api', router)

const port = process.env.PORT;
//express server
app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
  });