import { fetchRequest } from "./fetch_methods";
import { apiUserCart } from "./dictionary";

/*  

    successful expected responses:
    - res.cart: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const updateUserCart = async (cart, token) => {
  return await fetchRequest("PUT", apiUserCart(), cart, token);
};

export default updateUserCart;
