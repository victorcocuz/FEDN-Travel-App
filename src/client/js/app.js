const localUrl = `//localhost:${process.env.PORT}`;
const today = new Date();
const currentMonth = [];

// Add calendar and functionality

function showCalendar(offset, index) {
        Client.loadCalendar(
            parseInt(currentMonth[index].getAttribute('data-year')),
            parseInt(currentMonth[index].getAttribute('data-month')),
            offset,
            index
        );
}

for (let index = 0; index < 2; index++) {
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
}

// document.querySelector('.calendar-month-previous').addEventListener('click', () =>{
//     Client.loadCalendar(
//         parseInt(currentMonth.getAttribute('data-year')),
//         parseInt(currentMonth.getAttribute('data-month')),
//         Client.PREVIOUS
//     );
// });

// document.querySelector('.calendar-month-next').addEventListener('click', () =>{
//     Client.loadCalendar(
//         parseInt(currentMonth.getAttribute('data-year')),
//         parseInt(currentMonth.getAttribute('data-month')),
//         Client.NEXT
//     );
// });

// Set Date information to form
document.querySelector('#calendar-0').addEventListener('click', getStartDate);
function getStartDate(event) {
    document.querySelector('#start-date').setAttribute('start-day', event.target.getAttribute('data-day'));
    document.querySelector('#start-date').setAttribute('start-month', event.target.getAttribute('data-month'));
    document.querySelector('#start-date').setAttribute('start-year', event.target.getAttribute('data-year'));
}

document.querySelector('#calendar-1').addEventListener('click', getEndDate);
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