
import { apiSearchProducts } from './dictionary';

async function getSearchProducts(name) {
    try {
        let data = await (await fetch(apiSearchProducts())).json();
        return data;
    } catch (e) {
        console.log("getSearchProducts() error:\n" + e);
    }
}

export default getSearchProducts;
