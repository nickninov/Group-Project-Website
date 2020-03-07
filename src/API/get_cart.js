import { fetchRequest } from "./fetch_methods";
import { apiCart } from "./dictionary";

/*  

    successful expected responses:
    - res.cart: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const getCart = async token => {
  return await fetchRequest("GET", apiCart(), null, token);
};

export default getCart;
