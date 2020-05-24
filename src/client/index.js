import {} from './js/app'

import { removeCalendar } from './js/calendar'
import { loadCalendar } from './js/calendar'

import { validateTown } from './js/validators'
import { validateDates } from './js/validators'
import { filterStartDateForWeather } from './js/validators'
import { filterEndDateForWeather } from './js/validators'

import { updateLocation } from './js/tripUpdates'
import { updateWeather } from './js/tripUpdates'
import { updatePhotos } from './js/tripUpdates'

import { Calendar } from './js/globals'
import { months } from './js/globals'
import { days } from './js/globals'
import { PREVIOUS } from './js/globals'
import { CURRENT } from './js/globals'
import { NEXT } from './js/globals'

import './styles/normalize.scss'
import './styles/resets.scss'
import './styles/main.scss'

export {
    // calendar.js
    removeCalendar,
    loadCalendar,

    // validators.js
    validateTown,
    validateDates,
    filterStartDateForWeather,
    filterEndDateForWeather,

    // tripUpdates.js
    updateLocation,
    updateWeather,
    updatePhotos,

    // globals.js
    Calendar,
    months,
    days,
    PREVIOUS,
    CURRENT,
    NEXT
}