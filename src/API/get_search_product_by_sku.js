
// #TODO untested

import { fetchRequest } from "./fetch_methods";
import { apiSearchProductBySku } from "./dictionary";

/*  

    successful expected responses:
    - res.name: String
    - res.description: String
    - res.images: List of Strings
    - res.tags: List of Strings
    - res.categories: List of categories
    - res.discount: Int
    - res.price: Int
    - res.stockLevel: String? #TODO
    - res.sku: String,
    - res.shippingDetails: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

export const getSearchProductBySku = async sku => {
  uri = encodeURIComponent(sku.trim());
  return await fetchRequest("GET", apiSearchProductBySku(uri), null, null);
};

export default getSearchProductBySku;
