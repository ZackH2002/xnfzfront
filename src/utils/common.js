export function dateFormat(date) {
    if (date == undefined || date == null || date === '') {
        return null;
    }
    let d = new Date(date);
    return d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate()) + ' ' + addZero(d.getHours()) + ':' + addZero(d.getMinutes());
}

function addZero(m) {
    return m < 10 ? '0' + m : m
}
export function nullFormat(input) {
    if (input == undefined || input == null || input === '') {
        return '--';
    }
    return input;
}