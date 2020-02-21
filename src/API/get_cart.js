
import { apiCart } from './dictionary';

async function getCart() {
    try {
        let data = await (await fetch(apiCart())).json();
        return data;
        // let data = await (await fetch('localhost:3000/product/' + id)).json();
        // return data;
    } catch (e) {
        console.log("getCart() error:\n" + e);
    }
}

export default getCart;
