const express = require("express");
const connectDb = require("../server/config/db")
const { sendAlert } = require("../server/utils/emailAlerts")
const { processWeatherData } = require("../server/Controller/Weather.controller")

const app = express();

connectDb();

const WEATHER_POLL_INTERVAL = 5 * 60 * 1000;//5 minutes

const ALERT_THRESHOLD = 35;

//polling weather data every 5 minutes
setInterval(async () => {
    for (const city of cities) {
        await processWeatherData(city, summaries);

        if (summaries[city]?.temp.slice(-2).every(temp => temp > ALERT_THRESHOLD)) {
            await sendAlert(
                `Temperature Alert in ${city}`,
                `The temperature in ${city} exceeded ${ALERT_THRESHOLD}°C for two consecutive updates`
            )
            console.log(`Alert Triggered for ${city}`);
        }

    }
}, WEATHER_POLL_INTERVAL)


PORT = 3000

app.listen(PORT, () => {
    console.log(`server is running on:http://localhost:${PORT}`)
})
