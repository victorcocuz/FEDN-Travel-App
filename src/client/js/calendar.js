function loadCalendar(year, month, offset, index) {
    const calendar = new Client.Calendar({
        siblingMonths: true,
        weekStart: true
    });

    Client.removeCalendar(index);

    let currentMonth = month + offset;
    let previousMonth;
    let nextMonth;

    previousMonth = currentMonth - 1;
    nextMonth = currentMonth + 1;
    switch (currentMonth){
        case -1:
            currentMonth = 11;
            previousMonth = currentMonth - 1;
            year = year + offset;
            break;
        case 0:
            previousMonth = 11;
            break;
        case 11:
            nextMonth = 0;
            break;
        case 12:
            currentMonth = 0;
            nextMonth = currentMonth + 1;
            year = year + offset;
    }

    const calendarMonthPrevious = document.querySelector(`.calendar-month-previous-${index}`);
    const calendarMonthCurrent = document.querySelector(`.calendar-month-current-${index}`);
    const calendarMonthNext = document.querySelector(`.calendar-month-next-${index}`);

    calendarMonthPrevious.textContent = Client.months[previousMonth];
    calendarMonthCurrent.textContent = `${Client.months[currentMonth]} ${year}`;
    calendarMonthCurrent.setAttribute('data-month', currentMonth);
    calendarMonthCurrent.setAttribute('data-year', year);
    calendarMonthNext.textContent = Client.months[nextMonth];

    // Generate week days
    const calendarDaysFragment = document.createDocumentFragment();
    for (const day of Client.days) {
        const li = document.createElement('li');
        li.className = 'calendar-week-day';
        li.innerText = day;
        calendarDaysFragment.appendChild(li);
    }

    // Generate days of the month
    const currentMonthCalendarLength = calendar.getCalendar(year, currentMonth).length;
    if (currentMonthCalendarLength == 28 ) {
        getCalendarDays(calendarDaysFragment, calendar, year, currentMonth, Client.PREVIOUS);
    }
    getCalendarDays(calendarDaysFragment, calendar, year, currentMonth, Client.CURRENT);
    if (currentMonthCalendarLength < 42) {
        getCalendarDays(calendarDaysFragment, calendar, year, currentMonth, Client.NEXT);
    }

    // Populate calendar
    const calendarList = document.querySelector(`.calendar-days-${index}`);
    calendarList.appendChild(calendarDaysFragment);
}

function removeCalendar(index) {
    document.querySelector(`.calendar-days-${index}`).innerHTML = "";
}

function getCalendarDays(calendarDaysFragment, calendar, year, currentMonth, offset){
    const calendarMonth = calendar.getCalendar(year, currentMonth + offset);
    let min, max;

    switch (offset) {
        case Client.PREVIOUS:
            min = calendarMonth.length - 7;
            max = calendarMonth.length;
            break;
        case Client.CURRENT:
            min = 0;
            max = calendarMonth.length;
            break;
        case Client.NEXT:
            if (calendarMonth[0].siblingMonth) {
                min = 7;
                max = 14;
            } else {
                min = 0;
                max = 7;
            }
            break;
    }

    for (let index = min; index < max; index++) {
        if (calendarMonth[index]) {
            calendarDaysFragment.appendChild(createCalendarDays(calendarMonth[index], offset));
        }
    }
}

function createCalendarDays(date, offset) {
    const li = document.createElement('li');
    if (offset == Client.PREVIOUS || offset == Client.NEXT || date.siblingMonth) {
        li.className = 'calendar-day sibling-month';
    } else {
        li.className = 'calendar-day';
    }
    li.setAttribute('data-day', date.day);
    li.setAttribute('data-month', date.month);
    li.setAttribute('data-year', date.year);
    li.innerHTML = date.day;
    return li;
}

export { 
    removeCalendar,
    loadCalendar
}