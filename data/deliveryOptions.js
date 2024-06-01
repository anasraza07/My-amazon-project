import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { isWeekend } from "../scripts/utils/day.js";

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach(option => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption;
};

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let daysToBeAdded = deliveryOption.deliveryDays;
    let deliveryDate = today.add(1, 'days');

    for (let i = 0; daysToBeAdded > 0; i++) {
        if (isWeekend(deliveryDate)) {
            deliveryDate = deliveryDate.add(1, 'days');
        } else {
            deliveryDate = deliveryDate.add(1, 'days');
            daysToBeAdded--;
        }
    }
    return deliveryDate.subtract(1, 'days').format('dddd, MMMM DD');
};


