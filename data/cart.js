export let cart;

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    };
};
loadFromStorage();

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
};
saveToStorage();

export function addToCart(productId) {
    let matchingItem;
    cart.forEach(cartItem => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    let productQuantity;

    if (document.querySelector(`.js-quantity-selector-${productId}`)) {
        productQuantity = Number(document
            .querySelector(`.js-quantity-selector-${productId}`).value);

    } else {
        productQuantity = 1;
    }

    if (matchingItem) {
        matchingItem.quantity += productQuantity;
        
    } else {
        cart.push({
            productId,
            quantity: productQuantity,
            deliveryOptionId: '1',
        });
    };
    saveToStorage();
};

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach(cartItem => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        };
    });

    cart = newCart;
    saveToStorage();
};

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
};

export function updateQuantity(productId, newQuantity) {
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        };
    });
    saveToStorage();
};

export function updateDeliveryOptionId(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
};

export function loadCart(func) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        func();
    })

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
};

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
};