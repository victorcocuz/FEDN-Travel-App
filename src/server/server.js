// Config Dotenv to receive environment variables
const dotenv = require('dotenv');
dotenv.config();

// Get Environment variables
const PORT = process.env.PORT || 8000;
const GEONAMES_USER = process.env.GEONAMES_USER;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY_2;

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

const projectData = {}
app.get('/all', sendData);
function sendData (req, res) {
    res.send(projectData);
};

const data = []
app.post('/', addSomething);

function addSomething(req, res){
    console.log(req.body);
    data.push(req.body);
};

// Routes
app.post('/getTripDetails', sendInfo);
function sendInfo (req, res) {
    const tripDetails = req.body.tripDetails;
    // Start an IIFE to use `await` at the top level
    (async () => {
        let coordinates = await getCoordinates(tripDetails.town);

        weatherbitData = {
            lat: coordinates.lat,
            lng: coordinates.lng,
            startDay: tripDetails.startDay,
            startMonth: parseInt(tripDetails.startMonth) + 1,
            startyear: tripDetails.startYear,
            endDay: tripDetails.endDay,
            endMonth: parseInt(tripDetails.endMonth) + 1,
            endYear: tripDetails.endYear
        };

        // let weatherForecastDaily = await getForecastDaily(weatherbitData);
        // console.log(weatherForecastDaily);

        let weatherForecastNormal = await getForecastNormal(weatherbitData);
        console.log(weatherForecastNormal);
        
        res.send(coordinates);
    })();
}

// Call Weatherbit API to get the next 16 days forecast
const getForecastDaily = async (tripDetails) => {
    const baseUrlForecastDaily = "http://api.weatherbit.io/v2.0/forecast/daily?";
    const paramsWeatherbit = new URLSearchParams({
        lat: tripDetails.lat,
        lon: tripDetails.lng,
        key: WEATHERBIT_API_KEY
    });
    const urlForecastDaily = `${baseUrlForecastDaily}${paramsWeatherbit.toString()}`;
    const response = await fetch(urlForecastDaily);

    try {
        const result = await response.json();
        const data = [];
        for (const dayForecast of result.data) {
            const item = {
                temp: dayForecast.temp,
                min_temp: dayForecast.low_temp,
                max_temp: dayForecast.max_temp,
                wind_spd: dayForecast.wind_spd,
                precip: dayForecast.precip,
                snow: dayForecast.snow,
                weather: dayForecast.weather,
                datetime: dayForecast.datetime
            };
            data.push(item);
        }
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// Call Weatherbit API to get normalized forecast
const getForecastNormal = async (tripDetails) => {
    const baseUrlForecastNormal = "http://api.weatherbit.io/v2.0/normals?";
    const paramsWeatherbit = new URLSearchParams({
        lat: tripDetails.lat,
        lon: tripDetails.lng,
        start_day: `${tripDetails.startMonth}-${tripDetails.startDay}`,
        end_day: `${tripDetails.endMonth}-${tripDetails.endDay}`,
        tp: 'daily',
        key: WEATHERBIT_API_KEY
    });
    const urlForecastNormal = `${baseUrlForecastNormal}${paramsWeatherbit.toString()}`;
    const response = await fetch(urlForecastNormal);

    try {
        const result = await response.json();
        const data = [];
        for (const dayForecast of result.data) {
            const item = {
                temp: dayForecast.temp,
                min_temp: dayForecast.low_temp,
                max_temp: dayForecast.max_temp,
                wind_spd: dayForecast.wind_spd,
                precip: dayForecast.precip,
                snow: dayForecast.snow,
                day: dayForecast.day,
                month: dayForecast.month
            };
            data.push(item);
        }
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// Call Geonames API:
const getCoordinates = async (town) => {
    const baseUrlGeonames = "http://api.geonames.org/searchJSON?";
    const paramsGeonames = new URLSearchParams({
        q: town,
        maxRows: '1',
        username: GEONAMES_USER
    });
    const urlGeonames = `${baseUrlGeonames}${paramsGeonames.toString()}`;
    const response = await fetch(urlGeonames);
    const result = await response.json();
    let newLocation = {};

    try {
        newLocation = {
            lat: result.geonames[0].lat,
            lng: result.geonames[0].lng,
            countryCode: result.geonames[0].countryCode
        };
    } catch (error) {
        console.log('error:', error);
    };
    return newLocation;
}