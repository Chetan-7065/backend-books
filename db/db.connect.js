const mongoose = require("mongoose")
require("dotenv").config()

const MONGODB = process.env.MONGODB

const initializeDatabase = async () => {
 await mongoose.connect(MONGODB)
 .then(() => {
    console.log("Connected successfully")
  })
  .catch((error) => {
    console.log("Connection Failed", error)
  })
}

module.exports = {initializeDatabase}