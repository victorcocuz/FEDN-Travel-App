function removeCalendar() {
    document.querySelector('.calendar-days').innerHTML = "";
}

function showCalendar(year, month, offset) {
    Client.removeCalendar();
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

    const calendarMonthPrevious = document.querySelectorAll('.calendar-month-previous');
    const calendarMonthCurrent = document.querySelectorAll('.calendar-month-current');
    const calendarMonthNext = document.querySelectorAll('.calendar-month-next');

    for (let i = 0; i < 2; i++) {
        calendarMonthPrevious[i].textContent = Client.months[previousMonth];
        calendarMonthCurrent[i].textContent = `${Client.months[currentMonth]} ${year}`;
        calendarMonthCurrent[i].setAttribute('data-month', currentMonth);
        calendarMonthCurrent[i].setAttribute('data-year', year);
        calendarMonthNext[i].textContent = Client.months[nextMonth];
    }

    const calendarDaysFragment = document.createDocumentFragment();
    for (const day of Client.days) {
        const li = document.createElement('li');
        li.className = 'calendar-week-day';
        li.innerText = day;
        calendarDaysFragment.appendChild(li);
    }
    
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

    const calendarDaysFragment2 = calendarDaysFragment.cloneNode(true);
    const calendarList = document.querySelectorAll('.calendar-days');
        calendarList[0].appendChild(calendarDaysFragment);
        calendarList[1].appendChild(calendarDaysFragment2);
}

export { 
    removeCalendar,
    showCalendar
}