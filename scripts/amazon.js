import { products } from "../data/products.js";
import { renderAmazonHeader } from "./amazon/amazonHeader.js";
import { cart } from "../data/cart-class.js";
import { loadPage } from './utils/page.js';

loadPage(() => {
    renderAmazonHeader();
    showSearchedProducts();
}); 

export function showSearchedProducts() {
    const url = new URL(window.location.href);
    let filteredArray = [];

    if (url.searchParams.size) {
        const searchValue = (url.searchParams.get('search')).toLowerCase();
        filteredArray = products.filter(product => {
            return product.name.toLowerCase().includes(searchValue) || product.keywords.join().toLowerCase().includes(searchValue);
        });
        renderProductsGrid(filteredArray);

    } else {
        renderProductsGrid(products);
    };
};

function renderProductsGrid(products) {
    let productsHTML = '';

    products.forEach((product) => {
        const { id, image, name } = product;
        const { count } = product.rating;

        productsHTML += `
        <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
            ${count}
        </div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${id}">
        Add to Cart
        </button>
    </div>
    `;
    });

    document.querySelector('.js-products-grid')
        .innerHTML = productsHTML;

    function updateCartQuantity() {
        const cartQuantity = cart.calculateCartQuantity();
        document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
    };

    document.querySelectorAll('.js-add-to-cart')
        .forEach(button => {
            let timeoutId = '';
            button.addEventListener('click', () => {
                const { productId } = button.dataset;
                cart.addToCart(productId, 1);
                updateCartQuantity();

                const addedToCartElem = document.querySelector(`.js-added-to-cart-${productId}`);

                addedToCartElem.classList.add('opacity-visible');

                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    addedToCartElem.classList.remove('opacity-visible');
                }, 2000)
            });
        });
};



