import {} from './js/app'
import { removeCalendar } from './js/calendar'
import { loadCalendar } from './js/calendar'
import { validateDates } from './js/validators'

import { Calendar } from './js/globals'
import { months } from './js/globals'
import { days } from './js/globals'
import { PREVIOUS } from './js/globals'
import { CURRENT } from './js/globals'
import { NEXT } from './js/globals'

import './styles/normalize.scss'
import './styles/main.scss'

export {
    // Calendar.js
    removeCalendar,
    loadCalendar,

    // Validators.js
    validateDates,

    // Globals.js
    Calendar,
    months,
    days,
    PREVIOUS,
    CURRENT,
    NEXT
}