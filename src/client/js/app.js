const localUrl = `//localhost:${process.env.PORT}`;
console.log(`${localUrl}/geonames`);

document.querySelector('#town-submit').addEventListener('click', testFunction);

function testFunction(event) {
    event.preventDefault()
    Client.logSomething();

    const town = document.querySelector('#town').value;
    getCoordinates(`${localUrl}/geonames`, town);
};

const getCoordinates = async (url, town) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({town: town})
    }).then(function(data){
        return data.json();
    }).then(function(data){
        console.log(data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

// function performAction(e) {
//     console.log('this test function is working');
//     Client.logSomething();
// };

export { testFunction }
// export { performAction }