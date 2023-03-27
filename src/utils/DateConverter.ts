

const convertDate = (date: Date) => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthsOfYear = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const month = monthsOfYear[date.getUTCMonth()];
    const dayOfMonth = date.getUTCDate();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const timeZone = 'EDT';

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth} • ${hours}:${minutes} ${timeZone}`;

    return formattedDate;
}

export default convertDate;
