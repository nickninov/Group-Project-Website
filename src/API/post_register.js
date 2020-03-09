import { fetchRequest } from "./fetch_methods";
import { apiRegister } from "./dictionary";

/*  

    successful expected responses:
    - res.success: true
    - res.token: String
    unsuccessful expected responses:
    - # TODO

*/

export const postRegister = async (firstName, lastName, email, phone, password, confirm_password) => {
  return await fetchRequest("POST", apiRegister(), {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: password,
    confirm_password: confirm_password
  });
};

export default postRegister;
