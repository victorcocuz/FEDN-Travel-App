import { Calendar } from "calendar-base"
const today = new Date();

function validateTown(town) {
    if (!town) {
        alert('No location has been provided');
        return false;
    }
    return true;
}

function validateDates(tripDetails) {
    if (!tripDetails.startYear
        || !tripDetails.startMonth
        || !tripDetails.startDay
        || !tripDetails.endYear
        || !tripDetails.endMonth
        || !tripDetails.endDay) {
            alert ('Trip dates are incomplete');
            return false;
        }

    if (Calendar.diff(
        { year: tripDetails.startYear, month: tripDetails.startMonth, day: tripDetails.startDay },
        { year: today.getFullYear(), month: today.getMonth(), day: today.getDate()}) < 0) {
            alert ('Start date of your trip cannot be in the past!');
            return false;
        };

    if (Calendar.diff(
        { year: tripDetails.endYear, month: tripDetails.endMonth, day: tripDetails.endDay },
        { year: tripDetails.startYear, month: tripDetails.startMonth, day: tripDetails.startDay }) < 1 ) {
            alert('End date of your trip cannot be before the trip begins!');
            return false;
        }
    return true;
}

function filterStartDateForWeather(tripDetails) {
    return Calendar.diff(
        { year: tripDetails.startYear, month: tripDetails.startMonth, day: tripDetails.startDay },
        { year: today.getFullYear(), month: today.getMonth(), day: today.getDate()}
    );
}

function filterEndDateForWeather (tripDetails) {
    return Calendar.diff(
        { year: tripDetails.endYear, month: tripDetails.endMonth, day: tripDetails.endDay },
        { year: today.getFullYear(), month: today.getMonth(), day: today.getDate()}
    );
}

export {
    validateTown,
    validateDates,
    filterStartDateForWeather,
    filterEndDateForWeather
}