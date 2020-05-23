const localUrl = `//localhost:${process.env.PORT}`;
const currentMonth = document.querySelector('.calendar-month-current');

// Add calendar and functionality
window.addEventListener('load', () => {
    Client.showCalendar(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        Client.CURRENT
    );
});

document.querySelector('.calendar-month-previous').addEventListener('click', () =>{
    Client.showCalendar(
        parseInt(currentMonth.getAttribute('data-year')),
        parseInt(currentMonth.getAttribute('data-month')),
        Client.PREVIOUS
    );
});

document.querySelector('.calendar-month-next').addEventListener('click', () =>{
    Client.showCalendar(
        parseInt(currentMonth.getAttribute('data-year')),
        parseInt(currentMonth.getAttribute('data-month')),
        Client.NEXT
    );
});

// Set Date information to form
document.querySelector('#calendar-01').addEventListener('click', getStartDate);
function getStartDate(event) {
    document.querySelector('#start-date').setAttribute('start-day', event.target.getAttribute('data-day'));
    document.querySelector('#start-date').setAttribute('start-month', event.target.getAttribute('data-month'));
    document.querySelector('#start-date').setAttribute('start-year', event.target.getAttribute('data-year'));
}

document.querySelector('#calendar-02').addEventListener('click', getEndDate);
function getEndDate(event) {
    document.querySelector('#end-date').setAttribute('end-day', event.target.getAttribute('data-day'));
    document.querySelector('#end-date').setAttribute('end-month', event.target.getAttribute('data-month'));
    document.querySelector('#end-date').setAttribute('end-year', event.target.getAttribute('data-year'));
}

// CALL API
document.querySelector('#town-submit').addEventListener('click', testFunction);

function testFunction(event) {
    event.preventDefault()

    const tripDetails = {
        town : document.querySelector('#town').value,
        startDay : document.querySelector('#start-date').getAttribute('start-day'),
        startMonth : document.querySelector('#start-date').getAttribute('start-month'),
        startYear : document.querySelector('#start-date').getAttribute('start-year'),
        endDay : document.querySelector('#end-date').getAttribute('end-day'),
        endMonth : document.querySelector('#end-date').getAttribute('end-month'),
        endYear : document.querySelector('#end-date').getAttribute('end-year')
    }

    if (Client.validateDates(tripDetails)) {
        getCoordinates(`${localUrl}/geonames`, tripDetails);
    }
    console.log(tripDetails);
};

const getCoordinates = async (url, tripDetails) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tripDetails: tripDetails})
    }).then(function(data){
        return data.json();
    }).then(function(data){
        console.log(data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

export { 
    testFunction,
 }