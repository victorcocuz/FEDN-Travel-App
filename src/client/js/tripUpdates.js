function updateLocation(location) {
    const tripLocationFragment = document.createDocumentFragment();
    Object.keys(location).forEach((key) => {
        const li = document.createElement('li');
        li.className = 'trip-location-details';
        li.innerText = location[key];
        tripLocationFragment.appendChild(li);
    });
    document.querySelector('#trip-location').appendChild(tripLocationFragment);
}

function updateWeather(weatherForecastDaily, weatherForecastNormal, startDate, endDate) {
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
    document.querySelector('#trip-weather').appendChild(weatherFragment);
}

function createWeatherCard(weatherForecast, index, daily) {
    const divWeatherCard = document.createElement('div');
    divWeatherCard.classList.add('weather-card');

    const divWeatherMonth = document.createElement('div');
    divWeatherMonth.classList.add('weather-month');
    const divWeatherDay = document.createElement('div');
    divWeatherDay.classList.add('weather-day');

    if (daily) {
        divWeatherMonth.textContent = weatherForecast[index].datetime.split('-')[1];
        divWeatherDay.textContent = weatherForecast[index].datetime.split('-')[2];

        const divWeatherIcon = document.createElement('div');
        divWeatherIcon.classList.add('weather-icon');
        divWeatherIcon.textContent = weatherForecast[index].weather.icon;
        divWeatherCard.appendChild(divWeatherIcon);

        const divWeatherDescription = document.createElement('div');
        divWeatherDescription.classList.add('weather-description');
        divWeatherDescription.textContent = weatherForecast[index].weather.description;
        divWeatherCard.appendChild(divWeatherDescription);
    } else {
        divWeatherMonth.textContent = weatherForecast[index].month;
        divWeatherDay.textContent = weatherForecast[index].day;
    }

    divWeatherCard.appendChild(divWeatherMonth);
    divWeatherCard.appendChild(divWeatherDay);

    const divWeatherTemp = document.createElement('div');
    divWeatherTemp.classList.add('weather-temp');
    divWeatherTemp.textContent = weatherForecast[index].temp;
    divWeatherCard.appendChild(divWeatherTemp);
    
    const divWeatherTempMin = document.createElement('div');
    divWeatherTempMin.classList.add('weather-temp-min');
    divWeatherTempMin.textContent = weatherForecast[index].min_temp;
    divWeatherCard.appendChild(divWeatherTempMin);

    const divWeatherTempMax = document.createElement('div');
    divWeatherTempMax.classList.add('weather-temp-max');
    divWeatherTempMax.textContent = weatherForecast[index].max_temp;
    divWeatherCard.appendChild(divWeatherTempMax);

    return divWeatherCard;
}

function updatePhotos(photos) {
    const photoLocationFragment = document.createDocumentFragment();
    for (const photo of photos) {
        const img = document.createElement('img');
        img.src = photo;
        photoLocationFragment.appendChild(img);
    }
    document.querySelector('#trip-photos').appendChild(photoLocationFragment);
}

export {
    updateLocation,
    updateWeather,
    updatePhotos
}