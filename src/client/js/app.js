const localUrl = `//localhost:${process.env.PORT}`;
const today = new Date();
const currentMonth = [];

// Add calendar
function showCalendar(offset, index) {
        Client.loadCalendar(
            parseInt(currentMonth[index].getAttribute('data-year')),
            parseInt(currentMonth[index].getAttribute('data-month')),
            offset,
            index
        );
}

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

// CALL API
document.querySelector('#town-submit').addEventListener('click', testFunction);

function testFunction(event) {
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

    if (Client.validateDates(tripDetails) == 1) {
        (async () => {
            // Call server to fetch location coordinates from the api
            let coordinates = await getData(`${localUrl}/getLocation`, tripDetails.town);
            console.log(`latitude is ${JSON.stringify({coordinates: coordinates})}`);

            const weatherbitData = {
                lat: coordinates.lat,
                lng: coordinates.lng,
                startDay: tripDetails.startDay,
                startMonth: parseInt(tripDetails.startMonth) + 1,
                startyear: tripDetails.startYear,
                endDay: tripDetails.endDay,
                endMonth: parseInt(tripDetails.endMonth) + 1,
                endYear: tripDetails.endYear
            };
            console.log(`weather data is ${JSON.stringify({data : weatherbitData})}`);

            // Call server to fetch normal weather forecast for given dates
            let weatherForecastNormal = await getData(`${localUrl}/getWeatherNormal`, weatherbitData);
            console.log(`weather forecast normal is ${JSON.stringify({normalforecast: weatherForecastNormal})}`);

            // Call server to fetch daily forecast for the next 16 days
            // let weatherForecastDaily = await getData(`${localUrl}/getWeatherDaily`, weatherbitData);
            // console.log(`weather forecast normal is ${JSON.stringify({dailyforecast: weatherForecastDaily})}`);

            // Call server to fetch photos for given location
            // let photos = await getData(`${localUrl}/getWeatherDaily`, tripDetails.town);
            // console.log(`photos are ${JSON.stringify({photos: photos})}`);
        })();
    }
};

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

export { 
    testFunction
 }