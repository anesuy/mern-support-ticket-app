const mongoose = require('mongoose')

const connectDB = async () => {
  try {
  const connect = await mongoose.connect('')
  console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
  console.log(process.env.MONGO_URL)
  } catch (err) {
    console.log(process.env.MONGO_URL)
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1); //if it does fail, then it will just exit the entire process
  }
}

module.exports = connectDB
