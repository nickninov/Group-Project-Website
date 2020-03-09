import { fetchRequest } from "./fetch_methods";
import { apiUser } from "./dictionary";

/*  

    successful expected responses:
    - res.firstName: String
    - res.cartAccount: Int
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const getUser = async token => {
  return await fetchRequest("GET", apiUser(), null, token);
};

export default getUser;
