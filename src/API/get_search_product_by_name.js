
// #TODO untested

import { fetchRequest } from "./fetch_methods";
import { apiSearchProductByName } from "./dictionary";

/*  

    successful expected responses:
    - res.products: List of Objects
    unsuccessful expected responses:
    - # TODO

*/



export const getSearchProductByName = async name => {
  uri = encodeURIComponent(name.trim());
  return await fetchRequest("GET", apiSearchProductByName(uri), null, null);
};

export default getSearchProductByName;
