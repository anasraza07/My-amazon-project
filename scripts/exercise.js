import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from './utils/day.js';

const today = dayjs();
const solution15a = today.add(5, 'days').format('MMMM DD')
console.log(solution15a);

const solution15b = today.add(1, 'month').format('MMMM DD');
console.log(solution15b)

const solution15c = today.subtract(1, 'month').format('MMMM DD');
console.log(solution15c);

const solution15d = dayjs().format('dddd');
console.log(solution15d);

let date = dayjs();
console.log(date.format('dddd, MMMM D'));
console.log(isSatSun(date));

date = dayjs().add(2, 'days');
console.log(date.format('dddd, MMMM D'));
console.log(isSatSun(date));

date = dayjs().add(4, 'days');
console.log(date.format('dddd, MMMM D'));
console.log(isSatSun(date));



