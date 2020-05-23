import { Calendar } from "calendar-base"

function validateDates(tripDetails) {
    const today = new Date();
    const presentDiff = Calendar.diff(
        { year: tripDetails.startYear, month: tripDetails.startMonth, day: tripDetails.startDay },
        { year: today.getFullYear(), month: today.getMonth(), day: today.getDate()}
    );

    if (presentDiff < 0) {
        alert ('Start date of your trip cannot be in the past!');
        return 0;
    }
    const datesDiff = Calendar.diff(
        { year: tripDetails.endYear, month: tripDetails.endMonth, day: tripDetails.endDay },
        { year: tripDetails.startYear, month: tripDetails.startMonth, day: tripDetails.startDay }
    )
    if (datesDiff < 1 ) {
        alert('End date of your trip cannot be before the trip begins!');
        return 0;
    }
    if (presentDiff > 15) {
        return 2;
    }

    return 1;
}

export {
    validateDates
}