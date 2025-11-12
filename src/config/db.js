const mongoose = require("mongoose");
const config = require("./index");

function connectToDB() {
  mongoose.connect(config.dbUrl).then(() => {
    console.log("Connected To Database");
  });
}

module.exports = connectToDB;
