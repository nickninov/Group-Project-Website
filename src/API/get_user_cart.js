import { fetchRequest } from "./fetch_methods";
import { apiUserCart } from "./dictionary";

/*  

    successful expected responses:
    - res.cart: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const getUserCart = async token => {
  return await fetchRequest("GET", apiUserCart(), null, token);
};

export default getUserCart;
