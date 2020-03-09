
// #TODO untested

import { fetchRequest } from "./fetch_methods";
import { apiSearchCategoryById } from "./dictionary";

/*  

    successful expected responses:
    - res.products: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

export const getSearchCategoryById = async id => {
  return await fetchRequest("GET", apiSearchCategoryById(id), null, null);
};

export default getSearchCategoryById;
