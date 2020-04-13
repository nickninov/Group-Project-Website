/**
 * all routes used for api are functions, e.g. apiCart() instead of apiCart
 */

const _serverDomain = "http://localhost:80";
const _apiVersion = "/v1";
const _base = `${_serverDomain}${_apiVersion}`;

// unprotected
export const apiSearchCategory = () => `${_base}/search/category`;
export const apiSearchCategoryById = (id) => `${_base}/search/category/${id}`;
export const apiSearchProduct = () => `${_base}/search/product`;
export const apiSearchProductById = (id) => `${_base}/search/product/${id}`;
export const apiSearchProductBySku = (sku) => `${_base}/search/product/${sku}`;
export const apiSearchProductByName = (name) =>
  `${_base}/search/product/${name}`;

// authentication
export const apiLogin = () => `${_base}/auth/login`;
export const apiRegister = () => `${_base}/auth/register`;

// protected
export const apiUser = () => `${_base}/user`;
export const apiUserAccount = () => `${_base}/user/account`;
export const apiUserCart = () => `${_base}/user/cart`;
export const apiOrder = () => `${_base}/user/order`;
export const apiRating = () => `${_base}/user/rate`;

