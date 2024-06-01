import { orders } from '../data/orders.js';
import { getProduct } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { extractNumbers } from './utils/functions.js';
import { cart } from '../data/cart-class.js';
import { calculateCorrectDate, formatDate } from './utils/day.js';
import { loadPage } from './utils/page.js';
import { renderAmazonHeader } from './amazon/amazonHeader.js';

loadPage(() => {
    renderAmazonHeader();
    renderAllOrders();
});

function renderAllOrders() {

    let orderContainersHTML = '';

    orders.forEach(order => {
        const orderPlacedDate = formatDate(order.orderTime);

        orderContainersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderPlacedDate}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${orderDetailsHTML(order)}
                </div>
            </div>
        `;
    });

    function orderDetailsHTML(orderItem) {
        let orderDetailsHTML = '';
        orderItem.products.forEach((product) => {
            const estimatedDeliveryDate = calculateCorrectDate(product.estimatedDeliveryTime).format('MMMM, DD');;
            const matchingProduct = getProduct(product.productId);

            orderDetailsHTML += `
            <div class="product-image-container">
                <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${estimatedDeliveryDate}
                </div>
                <div class="product-quantity js-product-quantity-${orderItem.id}${matchingProduct.id}">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again" data-order-id="${orderItem.id}" data-product-id="${matchingProduct.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${orderItem.id}&productId=${matchingProduct.id}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
        });

        return orderDetailsHTML;
    };

    document.querySelector('.js-orders-grid')
        .innerHTML = orderContainersHTML;

    document.querySelectorAll('.js-buy-again')
        .forEach(button => {
            button.addEventListener('click', () => {
                const { orderId, productId } = button.dataset;
                const quantityText = document
                    .querySelector(`.js-product-quantity-${orderId}${productId}`).innerText;
                const quantity = extractNumbers(quantityText);
                cart.addToCart(productId, quantity);
                button.innerHTML = 'Added'
                setTimeout(() => {
                    button.innerHTML = `
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    `;
                }, 1000)
            });
        });
};

