const localUrl = `//localhost:${process.env.PORT}`;
const currentMonth = document.querySelector('.calendar-month-current');

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

document.querySelector('#town-submit').addEventListener('click', testFunction);

function testFunction(event) {
    event.preventDefault()
    Client.logSomething();

    const town = document.querySelector('#town').value;
    // getCoordinates(`${localUrl}/geonames`, town);
};

// const getCoordinates = async (url, town) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({town: town})
//     }).then(function(data){
//         return data.json();
//     }).then(function(data){
//         console.log(data);
//     }).catch((error) => {
//         console.error('Error:', error);
//     });
// }

export { testFunction }