import { fetchRequest } from "./fetch_methods";
import { apiUserAccount } from "./dictionary";

/*  

    successful expected responses:
    - res.firstName: String
    - res.lastName: String
    - res.email: String
    - res.phone: String
    - res.addresses: List of String
    unsuccessful expected responses:
    - # TODO

*/

// auth route
export const getUserAccount = async token => {
  return await fetchRequest("GET", apiUserAccount(), null, token);
};

export default getUserAccount;
