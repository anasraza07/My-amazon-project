import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadPage } from './utils/page.js';
// import '../data/car.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

loadPage(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});