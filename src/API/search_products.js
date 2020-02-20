

async function searchProducts(name) {
    try {
        // either in URL or in request header
        // let data = await (await fetch(... + name)).json();
        // return data;
    } catch (e) {
        console.log("searchProducts() error:\n" + e);
    }
}

export default searchProducts;
