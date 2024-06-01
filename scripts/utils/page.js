import { loadProductsFetch } from "../../data/products.js";
import { loadCartFetch } from "../../data/cart.js";

export async function loadPage(func) {
    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch(),
        ])

    } catch (error) {
        console.log('Unexpexted error. Please try again later', error);
    };
    
    func();
};