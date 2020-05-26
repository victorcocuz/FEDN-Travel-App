// JS Imports
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

import { formatDay } from './js/helpers'

// CSS Imports
import './styles/main.sass'

// Media Imports
import logo from './media/logo/logo_sample.png'
import icon_a01d from './media/icons/a01d.png';
import icon_a02d from './media/icons/a02d.png';
import icon_a03d from './media/icons/a03d.png';
import icon_a04d from './media/icons/a04d.png';
import icon_a05d from './media/icons/a05d.png';
import icon_a06d from './media/icons/a06d.png';
import icon_c01d from './media/icons/c01d.png';
import icon_c02d from './media/icons/c02d.png';
import icon_c03d from './media/icons/c03d.png';
import icon_c04d from './media/icons/c04d.png';
import icon_d01d from './media/icons/d01d.png';
import icon_d02d from './media/icons/d02d.png';
import icon_d03d from './media/icons/d03d.png';
import icon_f01d from './media/icons/f01d.png';
import icon_r01d from './media/icons/r01d.png';
import icon_r02d from './media/icons/r02d.png';
import icon_r03d from './media/icons/r03d.png';
import icon_r04d from './media/icons/r04d.png';
import icon_r05d from './media/icons/r05d.png';
import icon_r06d from './media/icons/r06d.png';
import icon_s01d from './media/icons/s01d.png';
import icon_s02d from './media/icons/s02d.png';
import icon_s03d from './media/icons/s03d.png';
import icon_s04d from './media/icons/s04d.png';
import icon_s05d from './media/icons/s05d.png';
import icon_s06d from './media/icons/s06d.png';
import icon_t01d from './media/icons/t01d.png';
import icon_t02d from './media/icons/t02d.png';
import icon_t03d from './media/icons/t03d.png';
import icon_t04d from './media/icons/t04d.png';
import icon_t05d from './media/icons/t05d.png';
import icon_u00d from './media/icons/u00d.png';

const icons = {
    icon_a01d: icon_a01d,
    icon_a02d: icon_a02d,
    icon_a03d: icon_a03d,
    icon_a04d: icon_a04d,
    icon_a05d: icon_a05d,
    icon_a06d: icon_a06d,
    icon_c01d: icon_c01d,
    icon_c02d: icon_c02d,
    icon_c03d: icon_c03d,
    icon_c04d: icon_c04d,
    icon_d01d: icon_d01d,
    icon_d02d: icon_d02d,
    icon_d03d: icon_d03d,
    icon_f01d: icon_f01d,
    icon_r01d: icon_r01d,
    icon_r02d: icon_r02d,
    icon_r03d: icon_r03d,
    icon_r04d: icon_r04d,
    icon_r05d: icon_r05d,
    icon_r06d: icon_r06d,
    icon_s01d: icon_s01d,
    icon_s02d: icon_s02d,
    icon_s03d: icon_s03d,
    icon_s04d: icon_s04d,
    icon_s05d: icon_s05d,
    icon_s06d: icon_s06d,
    icon_t01d: icon_t01d,
    icon_t02d: icon_t02d,
    icon_t03d: icon_t03d,
    icon_t04d: icon_t04d,
    icon_t05d: icon_t05d,
    icon_u00d: icon_u00d,
    };

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

    // helpers.js
    formatDay,

    // globals.js
    Calendar,
    months,
    days,
    PREVIOUS,
    CURRENT,
    NEXT,

    // Icons
    logo,
    icons
}