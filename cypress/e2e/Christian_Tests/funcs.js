export function getDateNow(date) {
    return `${date.getUTCFullYear()}_${
        ((date.getUTCMonth() + 1) % 12).toLocaleString('en-us', {minimumIntegerDigits: 2})
    }_${
        date.getUTCDate().toLocaleString('en-us', {minimumIntegerDigits: 2})
    }_${
        ((date.getUTCHours() + 11) % 12 + 1).toLocaleString('en-us', {minimumIntegerDigits: 2})
    }_${
        date.getUTCMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2})
    }`;
}