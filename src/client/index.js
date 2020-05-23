import { testFunction } from './js/app'
import { removeCalendar } from './js/calendar'
import { showCalendar } from './js/calendar'
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
    testFunction,
    removeCalendar,
    showCalendar,

    // Validators
    validateDates,

    // Globals
    Calendar,
    months,
    days,
    PREVIOUS,
    CURRENT,
    NEXT
}