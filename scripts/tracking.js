import { getOrder } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct } from '../data/products.js';
import { loadPage } from "./utils/page.js";
import { renderAmazonHeader } from "./amazon/amazonHeader.js";
import { calculateCorrectDate } from './utils/day.js';

loadPage(() => {
    renderAmazonHeader();
    renderTrackingPage();
});

function renderTrackingPage() {

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const orderObject = getOrder(orderId);
    const { orderTime, products } = orderObject;

    const trackingProduct = products.find((product) => {
        return product.productId === productId;
    });
    const { estimatedDeliveryTime } = trackingProduct;

    const product = getProduct(productId);
    const today = dayjs();
    const arrivingDate = dayjs(calculateCorrectDate(estimatedDeliveryTime));
    const estimatedDeliveryDate = arrivingDate.format('dddd, MMMM DD');

    const trackingHTML = `
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                ${today < dayjs(arrivingDate) ? 'Arriving on' : 'Delivered on'} ${estimatedDeliveryDate}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
                Quantity: ${trackingProduct.quantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar js-progress-bar"></div>
            </div>
        </div>
    `;

    document.querySelector('.js-order-tracking')
        .innerHTML = trackingHTML;

    const orderDuration = new Date() - new Date(orderTime);
    const deliveryDuration = new Date(estimatedDeliveryTime) - new Date(orderTime);
    const deliveryProgress = orderDuration / deliveryDuration;
    const progressPercent = deliveryProgress * 100;

    document.querySelector('.js-progress-bar')
        .setAttribute('style', `width:${progressPercent}%`);

    if (progressPercent >= 0 && progressPercent <= 49) {
        addClass('Preparing');

    } else if (progressPercent >= 50 && progressPercent <= 99) {
        addClass('Shipped');

    } else if (progressPercent >= 100) {
        addClass('Delivered');
    };

    function addClass(labelText) {
        document.querySelectorAll('.progress-label')
            .forEach((label => {
                if (label.innerText === labelText) {
                    label.classList.add('current-status');
                    return;
                };
            }));
    };
};



