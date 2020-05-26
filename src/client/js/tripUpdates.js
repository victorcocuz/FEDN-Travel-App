/*******************************************************************************************************
Update INDEX.HTML with data from API
********************************************************************************************************/
// Update index.html with location data
function updateLocation(location) {
    const tripLocationElement = document.querySelector('#trip-location');
    tripLocationElement.innerHTML = ""
    const tripLocationFragment = document.createDocumentFragment();
    const locationInfo = [
        `City: ${location.toponymName}`,
        `Country: ${location.countryName}`,
        `Country Code: ${location.countryCode}`,
        `Population: ${location.population}`,
        `Latitude: ${location.lat}`,
        `Longitude: ${location.lng}`
    ]
    locationInfo.forEach(item => {
        const li = document.createElement('li');
        li.className = 'trip-location-details';
        li.innerText = item;
        tripLocationFragment.appendChild(li);
    });
    document.querySelector('#trip-location').appendChild(tripLocationFragment);
}

// Update index.html with weather data
function updateWeather(weatherForecastDaily, weatherForecastNormal, startDate, endDate) {
    const tripWeatherElement = document.querySelector('#trip-weather');
    tripWeatherElement.innerHTML = "";
    const weatherFragment = document.createDocumentFragment();
    if (startDate < 16) {
        for (let index = startDate; index < Math.min(endDate, 16); index++) {
            const divWeatherCard = createWeatherCard(weatherForecastDaily, index, true);
            weatherFragment.appendChild(divWeatherCard);
        }
        if (endDate >= 16) {
            for (let index = 16 - startDate; index < weatherForecastNormal.length; index++) {
                const divWeatherCard = createWeatherCard(weatherForecastNormal, index, false);
                weatherFragment.appendChild(divWeatherCard);
            }
        }
    } else {
        for (let index = 0; index < weatherForecastNormal.length; index++) {
            const divWeatherCard = createWeatherCard(weatherForecastNormal, index, false);
            weatherFragment.appendChild(divWeatherCard);
        }
    }
    tripWeatherElement.appendChild(weatherFragment);
}

// Update index.html with photos data
function updatePhotos(photos) {
    const tripPhotosElement = document.querySelector('#trip-photos');
    tripPhotosElement.innerHTML = "";
    const photoLocationFragment = document.createDocumentFragment();
    for (const photo of photos) {
        const img = document.createElement('img');
        img.src = photo;
        photoLocationFragment.appendChild(img);
    }
    tripPhotosElement.appendChild(photoLocationFragment);
}

export {
    updateLocation,
    updateWeather,
    updatePhotos
}


/*******************************************************************************************************
Helper methods
********************************************************************************************************/
// Create weather card for a given day
function createWeatherCard(weatherForecast, index, daily) {
    const icons = Client.icons;

    // Create weather card
    const divWeatherCard = document.createElement('div');
    divWeatherCard.classList.add('weather-card');

    // Update Month and Day
    const divWeatherDate = document.createElement('div');
    divWeatherDate.classList.add('weather-month');

    if (daily) {
        divWeatherDate.textContent = `${Client.months[parseInt(weatherForecast[index].datetime.split('-')[1]) - 1]} ${Client.formatDay(parseInt(weatherForecast[index].datetime.split('-')[2]))}`;
    } else {
        divWeatherDate.textContent = `${Client.months[parseInt(weatherForecast[index].month) - 1]} ${Client.formatDay(parseInt(weatherForecast[index].day))}`;
    }
    divWeatherCard.appendChild(divWeatherDate);

    // Update Icons and Description
    const imgWeatherIcon = document.createElement('img');
    imgWeatherIcon.classList.add('weather-icon');
    const divWeatherDescription = document.createElement('div');
    divWeatherDescription.classList.add('weather-description');
    if (daily) {
        imgWeatherIcon.src = icons[`icon_${weatherForecast[index].weather.icon}`];
        imgWeatherIcon.alt = weatherForecast[index].weather.description;
        divWeatherDescription.textContent = weatherForecast[index].weather.description;
    } else {
        imgWeatherIcon.src = icons[`icon_c02d`];
        imgWeatherIcon.alt = 'Not Applicable';
        divWeatherDescription.textContent = 'Historic Data';
    }
    divWeatherCard.appendChild(imgWeatherIcon);
    divWeatherCard.appendChild(divWeatherDescription);

    // Update temperature
    const divWeatherTemp = document.createElement('div');
    divWeatherTemp.classList.add('weather-temp');
    divWeatherTemp.textContent = `${weatherForecast[index].temp}${String.fromCharCode(176)}C`;
    divWeatherCard.appendChild(divWeatherTemp);
    
    // Update min temperature
    const divWeatherTempRange = document.createElement('div');
    divWeatherTempRange.classList.add('weather-temp-range');
    divWeatherTempRange.textContent = `${weatherForecast[index].min_temp}${String.fromCharCode(176)}C - ${weatherForecast[index].max_temp}${String.fromCharCode(176)}C`;
    divWeatherCard.appendChild(divWeatherTempRange);

    return divWeatherCard;
}