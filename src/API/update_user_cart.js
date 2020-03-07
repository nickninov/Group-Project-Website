import { getData } from "./fetch_methods";
import { apiCart } from "./dictionary";

/*  

    successful expected responses:
    - res.cart: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const updateCart = async (token, cart) => {
  return await getData(apiCart(), {
    token: token,
    cart: cart
  });
};

export default updateCart;
