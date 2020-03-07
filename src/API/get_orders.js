import { fetchRequest } from "./fetch_methods";
import { apiOrder } from "./dictionary";

/*  

    successful expected responses:
    - res.orders: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const getOrders = async token => {
  return await fetchRequest("GET", apiOrder(), null, token);
};

export default getOrders;
