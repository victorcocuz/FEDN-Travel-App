// Config Dotenv to receive environment variables
const dotenv = require('dotenv');
dotenv.config();

// Setup Express
const express = require('express');
const app = express();

// Use Express to create a proxy server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Setup Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('dist'));

// Create express server
const PORT = process.env.PORT || 8000;
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