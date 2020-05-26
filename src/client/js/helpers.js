function formatDay(day) {
    switch (day % 10) {
        case 1:
            return (day == '11') ? `${day}th` : `${day}st`;
        case 2:
            return `${day}nd`;
        case 3:
            return `${day}rd`;
        default:
            return `${day}th`;
    }
}

export {
    formatDay
}