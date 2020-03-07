import { fetchRequest } from "./fetch_methods";
import { apiSearchProductById } from "./dictionary";

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

export const getSearchProductById = async id => {
  return await fetchRequest("GET", apiSearchProductById(id), null, null);
};

export default getSearchProductById;
