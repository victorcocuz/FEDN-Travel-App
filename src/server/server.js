// Config Dotenv to receive environment variables
const dotenv = require('dotenv');
dotenv.config();

// Get Environment variables
const PORT = process.env.PORT || 8000;
const GEONAMES_USER = process.env.GEONAMES_USER;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXELBAY_API_KEY = process.env.PIXELBAY_API_KEY;

// Setup Express
const express = require('express');
const app = express();

// Add Cors and use Express to create a proxy server
var cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Add Node-Fetch
const fetch = require("node-fetch");

// Setup Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('dist'));

// Create express server
const server = app.listen(PORT, () => console.log(`listening on ${PORT}`));

// Generate app home page
const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

// Route to get location details from Geonames API
app.post('/getLocation', (req, res) => {
    const baseUrlGeonames = "http://api.geonames.org/searchJSON?";
    const paramsGeonames = new URLSearchParams({
        q: req.body.data,
        maxRows: '1',
        username: GEONAMES_USER
    });
    const urlGeonames = `${baseUrlGeonames}${paramsGeonames.toString()}`;
    let location = {};

    (async () => {
        const response = await fetch(urlGeonames);
        try {
            const result = await response.json();
            const firstResult = result.geonames[0];
            location = {
                toponymName: firstResult.toponymName,
                countryName: firstResult.countryName,
                countryCode: firstResult.countryCode,
                population: firstResult.population,
                lat: firstResult.lat,
                lng: firstResult.lng
            };
        } catch (error) {
            console.log('error:', error);
        };
        console.log(location);
        res.send(location);   
    })();
});

// Route to get normal weather for a given location and time period from Weatherbit API
app.post('/getWeatherNormal', (req, res) => {
    const baseUrlForecastNormal = "http://api.weatherbit.io/v2.0/normals?";
    const data = req.body.data;
    const paramsWeatherbit = new URLSearchParams({
        lat: data.lat,
        lon: data.lng,
        start_day: `${data.startMonth}-${data.startDay}`,
        end_day: `${data.endMonth}-${data.endDay}`,
        tp: 'daily',
        key: WEATHERBIT_API_KEY
    });
    const urlForecastNormal = `${baseUrlForecastNormal}${paramsWeatherbit.toString()}`;    
    const newNormalWeather = [];

    (async () => {
        const response = await fetch(urlForecastNormal);
        try {
            const result = await response.json();
            for (const dayForecast of result.data) {
                const item = {
                    temp: dayForecast.temp,
                    min_temp: dayForecast.min_temp,
                    max_temp: dayForecast.max_temp,
                    wind_spd: dayForecast.wind_spd,
                    precip: dayForecast.precip,
                    snow: dayForecast.snow,
                    month: dayForecast.month,
                    day: dayForecast.day
                };
                newNormalWeather.push(item);
            }
        } catch (error) {
            console.log('error:', error);
        };
        console.log(newNormalWeather);
        res.send(newNormalWeather);   
    })();
});

// Route to get daily weather for the following 16 days for a given location and time period from Weatherbit API
app.post('/getWeatherDaily', (req, res) => {
    const baseUrlForecastDaily = "http://api.weatherbit.io/v2.0/forecast/daily?";
    const data = req.body.data;
    const paramsWeatherbit = new URLSearchParams({
        lat: data.lat,
        lon: data.lng,
        key: WEATHERBIT_API_KEY
    });
    const urlForecastDaily = `${baseUrlForecastDaily}${paramsWeatherbit.toString()}`;
    const newWeatherDaily = [];

    (async () => {
        const response = await fetch(urlForecastDaily);
        try {
            const result = await response.json();
            for (const dayForecast of result.data) {
                const item = {
                    temp: dayForecast.temp,
                    min_temp: dayForecast.min_temp,
                    max_temp: dayForecast.max_temp,
                    wind_spd: dayForecast.wind_spd,
                    precip: dayForecast.precip,
                    snow: dayForecast.snow,
                    datetime: dayForecast.datetime,
                    weather: dayForecast.weather
                };
                newWeatherDaily.push(item);
            }
        } catch (error) {
            console.log('error:', error);
        };
        console.log(newWeatherDaily);
        res.send(newWeatherDaily);   
    })();
});

// Route to get photos for a given location from Pixabay API
app.post('/getPhotos', (req, res) => {
    const baseUrlPixelbay = "http://pixabay.com/api/?";
    const paramsPixelbay = new URLSearchParams({
        q: req.body.data,
        key: PIXELBAY_API_KEY,
        image_type: 'photo',
        per_page: '6'
    });
    const urlPixelBay = `${baseUrlPixelbay}${paramsPixelbay.toString()}`;
    let photoUrls = [];

    (async () => {
        const response = await fetch(urlPixelBay);
        try {
            const result = await response.json();
            for (const photo of result.hits) {
                photoUrls.push(photo.largeImageURL)
            };
        } catch (error) {
            console.log('error:', error);
        };
        console.log(photoUrls);
        res.send(photoUrls);   
    })();
});

module.exports = server