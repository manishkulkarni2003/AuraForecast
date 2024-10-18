const axios = require('axios');
const Weather = require("../models/Weather.model")
require('dotenv').config();

const kelvinToCelsius = (kelvin) => kelvin - 273.15;


//fetching the weather
const fetchWeather = async (city) => {
    try {
        //instead of fetch here im using axios 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.API_KEY}`)

        const data = response.data;

        const weatherInfo = {
            city,
            temp: kelvinToCelsius(data.main.feels_like),
            feels_like: kelvinToCelsius(data.main.feels_like),
            main: data.weather[0].main,
            dt: data.dt
        };
        return weatherInfo;
    } catch (error) {
        console.log(`Error While Fetching the Weather data for ${city}`, error.message);
        return null;
    }
};

//processing the weather data 

const processWeatherData = async (city, summaries) => {
    const data = await fetchWeather(city);
    if (!data) return;

    //adding data to city summaries 

    summaries[city] = summaries[city] || { temps: [], conditions: [] };
    summaries[city].temps.push(data.temp);
    summaries[city].condition.push(data.main);


    //storing in db
    const currentDate = new Date().getHours();

    if (currentDate === 0) {
        const temps = summaries[city].temps;
        const conditions = summaries[city].conditions;
        const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);
        const dominantCondition = conditions.sort((a, b) =>
            conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
        ).pop();

        const weather = new Weather({
            city,
            avgTemp,
            maxTemp,
            minTemp,
            dominantCondition
        });
        await weather.save();
        console.log(`Saved Daily Summary for ${city}`);


        //resets daily data
        summaries[city] = { temps: [], conditions: [] };


    }

}

module.exports = { processWeatherData }
