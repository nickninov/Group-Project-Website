import { fetchRequest } from "./fetch_methods";
import { apiSearchProduct } from "./dictionary";

/*  

    successful expected responses:
    - res.products: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

export const getSearchProduct = async () => {
  return await fetchRequest("GET", apiSearchProduct(), null, null);
};

export default getSearchProduct;
