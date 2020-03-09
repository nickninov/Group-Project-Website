/**
 * all routes used for api are functions, e.g. apiCart() instead of apiCart
 */

const _serverDomain = "http://localhost:80";
const _apiVersion = "/v1";
const _apiBase = `${_serverDomain}${_apiVersion}`;

// authentication
export const apiLogin = () => `${_apiBase}/auth/login`;
export const apiRegister = () => `${_apiBase}/auth/register`;

// account
export const apiUser = () => `${_apiBase}/user`;
export const apiUserAccount = () => `${_apiBase}/user/account`;

// cart
export const apiUserCart = () => `${_apiBase}/user/cart`;

// order
export const apiOrder = () => `${_apiBase}/user/order`;

// products
export const apiSearchCategory = () => `${_apiBase}/search/category`;
export const apiSearchCategoryById = id => `${_apiBase}/search/category/${id}`;
export const apiSearchProduct = () => `${_apiBase}/search/product`;
export const apiSearchProductById = id => `${_apiBase}/search/product/${id}`;
export const apiSearchProductBySku = sku => `${_apiBase}/search/product/${sku}`;
export const apiSearchProductByName = name =>
  `${_apiBase}/search/product/${name}`;


