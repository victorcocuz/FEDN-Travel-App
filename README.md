# FEDN Travel App

## Overview
This is the capstone project for the Front End Developer Nanodegree at Udacity. This project ties together all notions learned during the course:
- Webpack + Loaders and Plugins
- Sass styles
- Layouts and page design
- APIs: requests to external urls depending on each other
- Service workers
- Jest Tests

The Travel App takes in a town and two dates as input from the user and shows:
- Information about the location provided
- Weather data for the dates provided
- Photos for the location provided

This is achieved by calling 3 APIs: Geonames, Weatherbit and Pixelbay.

The app adds optional functionality through:
- An implemented calendar to choose dates
- Taking in a start and an end date
- Showing both actual forecast and historical weather data, depending on the dates of travel
- Incorporates icons into forecasts

## How to run the project
Fork and clone the repo. Then run:
-`npm install` - installs the nodes
-`npm run build-dev` - to start a development server
-`npm run build-prod` - to start a production server
-`npm test` - to run the jest tests
-`npm start` - to start the node server

-The development server will automatically open on `localhost:8000`.
-Once the node server is started, it will run on `localhost:8080`.

Notes:
-You will need to register with the APIs mentioned above and add the keys to your .env file to be able to run the project.
-You can change the port by declaring `PORT: <PORT-NUMBER>`. This has to be done both in the .env file and in the webpack.dev webpack.prod, as part of DefinePlugin configuration.

Type in the name of a city and the dates you wish to travel. The app will show you the results.

## Requirements
This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. Given that this is the Capstone project, it's highly encouraged for you to go above and beyond, adding additional functionality and customization to truly stand out with a project you are proud to have at the top of your portfolio!

## Project Rubric
Architecture

The project should have a structure like the one shown below. All files shown must be present (Webpack may be split into multiple config files, and names may differ) and the app must successfully render a home page with clear design and functionality added when index.html is loaded in the browser. No errors should display in console.

- Root:
  - `package.json`
  - `readme.md`
  - `webpack.config.js`
  - src folder
    - server folder
      - `server.js` (name will vary)
    - client folder
      - `index.js`
      - html/views folder
        - `index.html`
      - js folder
        - `app.js` (name will vary)
      - styles folder
        - `style.scss` (name will vary - may be broke into partials)
Webpack

Webpack config should contain at least 3 scripts, express server, build and test. Additionally, dev server may be included.

Testing

There should be at least one test for the express server and application javascript

Offline capabilities

The project must have service workers installed.

HTML & CSS

CRITERIA
MEETS SPECIFICATIONS
Usability

All features are usable across modern desktop, tablet, and phone browsers.

Styling

Styling is set up in a logical way. All interactive elements have hover states.

HTML Structure

HTML structure should be indented properly with classes and ID’s that make sense.

Visual Design

The design should clearly be different from the design used in projects 3 and 4.

API and JS Integration

CRITERIA
MEETS SPECIFICATIONS
Server

src > server > server.js
Server should be a near duplication of project 3 with the exception of additional added member: value pairs.

index.js

src > client > index.js
At least one function should be imported.
At least one event listener should be imported.
(styles referenced in html/css)
app.js

src > client > js > app.js
There should be URLS and API Keys for at least 3 APIs, including Geonames, Weatherbit, and Pixabay. You can feel free to use more than 3 APIs.
There should be a primary object with placeholder member value pairs.
There should be a primary function that is exported to index.js.
Extend Options / Ways to Stand Out

At least one option from the Extend your Project/Ways to Stand Out sections have been added. Please add a Note to your reviewer which one you chose to implement, or add into your README.

Documentation

CRITERIA
MEETS SPECIFICATIONS
README

A README file is included detailing the app and all dependencies.

Other requirements:
The Readme file should have non-default text in it that is specific to this project. It doesn’t have to be thorough, but should have some basic info. Bonus points if correct markdown is used.

Comments

Comments are present and effectively explain longer code procedure when necessary.

Code Quality

Code is formatted with consistent, logical, and easy-to-read formatting as described in the Udacity JavaScript Style Guide.
