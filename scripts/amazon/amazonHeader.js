import { cart } from "../../data/cart-class.js";

export function renderAmazonHeader() {
    const cartQuantity = cart.calculateCartQuantity();
    const url = new URL(window.location.href);
    const searchValue = url.searchParams.get('search') || '';

    const amazonHeaderHTML = `
        <div class="amazon-header-left-section">
            <a href="amazon.html" class="header-link">
                <img class="amazon-logo" src="images/amazon-logo-white.png">
                <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png">
            </a>
        </div>

        <div class="amazon-header-middle-section">
            <input class="search-bar js-search-bar" type="text" placeholder="Search" value="${searchValue}" required>
            
            <button class="search-button js-search-button" type="submit">
            <img class="search-icon" src="images/icons/search-icon.png">
            </button>
        </div>

        <div class="amazon-header-right-section">
            <a class="orders-link header-link" href="orders.html">
                <span class="returns-text">Returns</span>
                <span class="orders-text">& Orders</span>
            </a>

            <a class="cart-link header-link" href="checkout.html">
                <img class="cart-icon" src="images/icons/cart-icon.png">
                <div class="cart-quantity js-cart-quantity">${cartQuantity}</div>
                <div class="cart-text">Cart</div>
            </a>
        </div>
    `;

    document.querySelector('.js-amazon-header')
        .innerHTML = amazonHeaderHTML;

    document.querySelector('.js-search-bar')
        .addEventListener('keydown', (event) => {
            if (event.key === 'Enter'){
                saveSearchInURL();
            };
        });

    document.querySelector('.js-search-button')
        .addEventListener('click', () => {
            saveSearchInURL();
        });

    function saveSearchInURL() {
        const search = document.querySelector('.js-search-bar').value;
        if (search) {
            window.location.href = `amazon.html?search=${search}`;
        } else {
            window.location.href = `amazon.html`;
        }
    };
};


