// Config Dotenv to receive environment variables
const dotenv = require('dotenv');
dotenv.config();

// Get Environment variables
const GEONAMES_USER = process.env.GEONAMES_USER;
const PORT = process.env.PORT || 8000;

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
app.post('/geonames', sendCoordinates);
function sendCoordinates (req, res) {
    // Start an IIFE to use `await` at the top level
    (async () => {
        let coordinates = await getCoordinates(req.body.tripDetails.town);
        res.send(coordinates);
    })();
}

// Call Geonames API:
const getCoordinates = async (town) => {
    console.log(town);
    const baseUrlGeonames = "http://api.geonames.org/searchJSON?"
    const paramsGeonames = new URLSearchParams({
        q: town,
        maxRows: '1',
        username: GEONAMES_USER
    });
    const urlGeonames = `${baseUrlGeonames}${paramsGeonames.toString()}`;
    // console.log(urlGeonames);
    const response = await fetch(urlGeonames);
    const result = await response.json();
    let newLocation = {};

    try {
        newLocation = {
            lat: result.geonames[0].lng,
            lng: result.geonames[0].lng,
            countryCode: result.geonames[0].countryCode
        };
        console.log(result);
        console.log(newLocation);
    } catch (error) {
        console.log('error:', error);
    };
    return newLocation;
}