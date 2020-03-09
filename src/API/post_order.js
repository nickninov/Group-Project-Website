import { fetchRequest } from "./fetch_methods";
import { apiOrder } from "./dictionary";

/*  

    successful expected responses:
    - res.orderNo: String
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const postOrder = async (data, token) => {
  // return await fetchRequest("POST", apiOrder(), data, token);
  return await fetchRequest("POST", apiOrder(), data, token);
};

export default postOrder;
