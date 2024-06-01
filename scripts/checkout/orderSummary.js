import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
    let cartSummaryHTML = '';
    cart.cartItems.forEach(cartItem => {
        const { productId } = cartItem;
        const matchingProduct = getProduct(productId);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${cartItem.productId}">Update</span>
                        <input class="quantity-input js-quantity-input js-quantity-input-${cartItem.productId}" data-product-id="${cartItem.productId}">
                        <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${cartItem.productId}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${cartItem.productId}">Delete</span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>`
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach(deliveryOption => {
            const dateString = calculateDeliveryDate(deliveryOption);

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>`
        });

        return html;
    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    // function updateCartQuantity() {
    //     const cartQuantity = calculateCartQuantity();
    //     document.querySelector('.js-return-to-home')
    //         .innerHTML = `${cartQuantity} items`;
    // };
    // updateCartQuantity();

    document.querySelectorAll('.js-delete-quantity-link')
        .forEach(link => {
            link.addEventListener('click', () => {
                const { productId } = link.dataset;
                cart.removeFromCart(productId);
                // const container = document
                //     .querySelector(`.js-cart-item-container-${productId}`);
                // container.remove();
                renderCheckoutHeader();
                renderOrderSummary();
                renderPaymentSummary();
            })
        });

    document.querySelectorAll('.js-update-quantity-link')
        .forEach(link => {
            link.addEventListener('click', () => {
                const { productId } = link.dataset;
                const container = document.
                    querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add('is-editing-quantity');
            });
        });

    function updateNewQuantity(productId) {
        const newQuantity = Number(document
            .querySelector(`.js-quantity-input-${productId}`).value);
        if (newQuantity < 0 || newQuantity >= 1000) {
            alert("New Quantity must be at least 0 and less than 1000");
            return;
        };
        cart.updateQuantity(productId, newQuantity);

        const container = document
            .querySelector(`.js-cart-item-container-${productId}`);

        container.classList.remove('is-editing-quantity');

        const quantityLabel = document
            .querySelector(`.js-quantity-label-${productId}`);

        quantityLabel.innerHTML = newQuantity;
    };

    document.querySelectorAll('.js-save-quantity-link')
        .forEach(link => {
            link.addEventListener('click', () => {
                const { productId } = link.dataset;
                updateNewQuantity(productId);
                renderCheckoutHeader();
                renderPaymentSummary();
            });
        });

    document.querySelectorAll('.js-quantity-input')
        .forEach(input => {
            input.addEventListener('keydown', (event) => {
                const { productId } = input.dataset;
                if (event.key === 'Enter') {
                    updateNewQuantity(productId);
                    renderCheckoutHeader();
                    renderPaymentSummary();
                };
            });
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach(element => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                cart.updateDeliveryOptionId(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary()
            })
        });
};