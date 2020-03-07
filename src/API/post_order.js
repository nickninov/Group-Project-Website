
// #TODO untested

import { fetchRequest } from "./fetch_methods";
import { apiOrder } from "./dictionary";

/*  

    successful expected responses:
    - res.orderNo: String
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const order = async (token, cart) => {
  return await fetchRequest("POST", apiOrder(), {
    cart: cart
  }, token);
};

export default order;
