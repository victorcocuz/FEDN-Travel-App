function removeCalendar(index) {
    document.querySelector(`.calendar-days-${index}`).innerHTML = "";
}

function loadCalendar(year, month, offset, index) {
    Client.removeCalendar(index);
    const calendar = new Client.Calendar({
        siblingMonths: true,
        weekStart: true
    });

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
    calendar
    .getCalendar(year, month)
    .forEach(date => {
        const li = document.createElement('li');
        if (date) {
            li.className = 'calendar-day' + (date.siblingMonth ? ' sibling-month' : '');
            li.setAttribute('data-day', date.day);
            li.setAttribute('data-month', date.month);
            li.setAttribute('data-year', date.year);
            li.innerHTML = date.day;
        }
        calendarDaysFragment.appendChild(li);
    });

    // Populate calendar
    const calendarList = document.querySelector(`.calendar-days-${index}`);
    calendarList.appendChild(calendarDaysFragment);
}

export { 
    removeCalendar,
    loadCalendar
}