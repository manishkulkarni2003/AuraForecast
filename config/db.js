const mongoose = require("mongoose")

require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Connected")
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDb;