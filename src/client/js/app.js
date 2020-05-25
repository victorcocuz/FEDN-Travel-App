/*******************************************************************************************************
Imports and variables
********************************************************************************************************/
const localUrl = `//localhost:${process.env.PORT}`;
const today = new Date();
const currentMonth = [];


/*******************************************************************************************************
Add calendars
********************************************************************************************************/
// Loop through calendars
for (let index = 0; index < 2; index++) {
    // Add event listeners for calendar
    currentMonth[index] = document.querySelector(`.calendar-month-current-${index}`);
    window.addEventListener('load', () => {
        currentMonth[index].setAttribute('data-year', today.getFullYear());
        currentMonth[index].setAttribute('data-month', today.getMonth());
        showCalendar(Client.CURRENT, index);
    });
    document.querySelector(`.calendar-month-previous-${index}`).addEventListener('click', () =>{
        showCalendar(Client.PREVIOUS, index);
    });
    document.querySelector(`.calendar-month-next-${index}`).addEventListener('click', () =>{
        showCalendar(Client.NEXT, index);
    });

    // Set Date information to form
    document.querySelector(`#calendar-${index}`).addEventListener('click', (event) => {
        document.querySelector(`.selected-${index}`) && document.querySelector(`.selected-${index}`).classList.remove(`selected-${index}`);
        const date = document.querySelector(`#date-${index}`);
        const target = event.target;

        target.classList.add(`selected-${index}`);
        date.setAttribute(`day-${index}`, target.getAttribute('data-day'));
        date.setAttribute(`month-${index}`, target.getAttribute('data-month'));
        date.setAttribute(`year-${index}`, target.getAttribute('data-year'));
    });
}

/*******************************************************************************************************
Process submitted data
********************************************************************************************************/
// Get trip details when the user submits info
document.querySelector('#town-submit').addEventListener('click', (event) => {
    event.preventDefault()

    // Get trip details from user input
    const tripDetails = {
        town : document.querySelector('#town').value,
        startDay : document.querySelector('#date-0').getAttribute('day-0'),
        startMonth : document.querySelector('#date-0').getAttribute('month-0'),
        startYear : document.querySelector('#date-0').getAttribute('year-0'),
        endDay : document.querySelector('#date-1').getAttribute('day-1'),
        endMonth : document.querySelector('#date-1').getAttribute('month-1'),
        endYear : document.querySelector('#date-1').getAttribute('year-1')
    }

    // If validation failed, return
    if (!Client.validateTown(tripDetails.town) || !Client.validateDates(tripDetails)) {
        return;
    };

    // If validation passed, get location coordinates, normal weather and photos
    (async () => {
        // Call server to fetch location coordinates from the api
        let location = await getData(`${localUrl}/getLocation`, tripDetails.town);
        Client.updateLocation(location);
        // console.log(`coordinats are ${JSON.stringify({location: location})}`);

        const startDate = Client.filterStartDateForWeather(tripDetails);
        const endDate = Client.filterEndDateForWeather(tripDetails);
        const weatherbitData = {
            lat: location.lat,
            lng: location.lng,
            startDay: tripDetails.startDay,
            startMonth: parseInt(tripDetails.startMonth) + 1,
            startyear: tripDetails.startYear,
            endDay: tripDetails.endDay,
            endMonth: parseInt(tripDetails.endMonth) + 1,
            endYear: tripDetails.endYear
        };

        // If trip starts in less than 16 days get the daily forecast
        let weatherForecastDaily;
        if (startDate < 16) {
            // Call server to fetch daily forecast for the next 16 days
            weatherForecastDaily = await getData(`${localUrl}/getWeatherDaily`, weatherbitData);
            // console.log(`weather forecast daily is ${JSON.stringify({dailyforecast: weatherForecastDaily})}`);
        };

        // Call server to fetch normal weather forecast for given dates
        let weatherForecastNormal = await getData(`${localUrl}/getWeatherNormal`, weatherbitData);
        // console.log(`weather forecast normal is ${JSON.stringify({normalforecast: weatherForecastNormal})}`);
        
        Client.updateWeather(weatherForecastDaily, weatherForecastNormal, startDate, endDate);

        // Call server to fetch photos for given location
        // let photos = await getData(`${localUrl}/getPhotos`, tripDetails.town);
        // Client.updatePhotos(photos);
        // console.log(`photos are ${JSON.stringify({photos: photos})}`);
    })();
});

/*******************************************************************************************************
Helper methods
********************************************************************************************************/
// Add calendar
function showCalendar(offset, index) {
    Client.loadCalendar(
        parseInt(currentMonth[index].getAttribute('data-year')),
        parseInt(currentMonth[index].getAttribute('data-month')),
        offset,
        index
    );
}

const getData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    });
    try {
        return await response.json();
    } catch(error) {
        console.log("error", error);
    }
}