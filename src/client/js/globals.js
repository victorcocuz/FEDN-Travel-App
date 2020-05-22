const Calendar = require('calendar-base').Calendar;

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const days = [
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su'
];

const PREVIOUS = -1;
const CURRENT = 0;
const NEXT = 1;

export {
    Calendar,
    months,
    days,
    PREVIOUS,
    CURRENT,
    NEXT
}