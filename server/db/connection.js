const { default: mongoose } = require("mongoose");

async function connection(URL) {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Connected sucessfully");
      })
      .catch((err) => {
        console.log("Connection error", err);
      });
  }
  
  module.exports = connection;