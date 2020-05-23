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

    const tripDetails = {
        town : document.querySelector('#town').value,
        startDay : document.querySelector('#date-0').getAttribute('day-0'),
        startMonth : document.querySelector('#date-0').getAttribute('month-0'),
        startYear : document.querySelector('#date-0').getAttribute('year-0'),
        endDay : document.querySelector('#date-1').getAttribute('day-1'),
        endMonth : document.querySelector('#date-1').getAttribute('month-1'),
        endYear : document.querySelector('#date-1').getAttribute('year-1')
    }
    // console.log(Client.validateDates(tripDetails));

    if (Client.validateDates(tripDetails) == 1) {
        getCoordinates(`${localUrl}/getTripDetails`, tripDetails);
    }
    // console.log(tripDetails);
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
    testFunction
 }