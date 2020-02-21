
import { apiProduct } from './dictionary';

async function getProduct() {
    try {
        let data = await (await fetch(apiProduct())).json();
        return data[0];
    } catch (e) {
        console.log("getProduct() error:\n" + e);
    }
}

export default getProduct;
