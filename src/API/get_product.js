

async function getProduct(id) {
    try {
        let data = await (await fetch('https://raw.githubusercontent.com/dropcmd/test/master/MOCK_DATA.json')).json();
        return data[0];
        // let data = await (await fetch('localhost:3000/product/' + id)).json();
        // return data;
    } catch (e) {
        console.log("getProduct() error:\n" + e);
    }
}

export default getProduct;
