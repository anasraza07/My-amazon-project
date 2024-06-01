export function extractNumbers(str) {
    let numbers = '';
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            numbers += str[i];
        }
    }
    return Number(numbers);
};
