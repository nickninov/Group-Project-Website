import { fetchRequest } from "./fetch_methods";
import { apiLogin } from "./dictionary";

/*  

    await login("okay@gmail.com", "pineapple").then(res =>
        this.setState({ loginRes: res })
    );

    successful expected responses:
    - res.success: true
    - res.token: String
    unsuccessful expected responses:
    - res.email: String (error message)
    - res.password: String (error message)

*/

export const postLogin = async (email, password) => {
  return await fetchRequest("POST", apiLogin(), {
    email: email,
    password: password
  });
};

export default postLogin;
