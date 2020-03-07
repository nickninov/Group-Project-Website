import { getData } from "./fetch_methods";
import { apiSearchCategory } from "./dictionary";

/*  

    successful expected responses:
    - res.categories: List of Objects
    unsuccessful expected responses:
    - # TODO

*/

export const getSearchCategories = async () => {
  return await getData(apiSearchCategory());
};

export default getSearchCategories;
