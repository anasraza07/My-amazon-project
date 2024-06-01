import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; 

export function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
};

export function formatDate(date) {
    return dayjs(date).format('MMMM DD');
};

// check if date weekend main hai
// agr yes to 1 din add krdo
// agr no to yehi date return krdo

export function calculateCorrectDate(date) {
    let deliveryDate = dayjs(date);
    while (isWeekend(deliveryDate)) {
        deliveryDate = deliveryDate.add(1, 'day');
    };

    return deliveryDate;
};

// console.log(calculateCorrectDate('2024-06-04T04:05:59.655Z'));