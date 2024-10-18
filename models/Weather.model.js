const mongoose = require("mongoose")

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,

    },
    avgTemp: {
        type: Number
    },
    maxTemp: {
        type: Number
    },
    minTemp: {
        type: Number
    },
    dominantCondition: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model("Weather", weatherSchema)