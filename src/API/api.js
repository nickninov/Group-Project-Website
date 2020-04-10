import { fetchRequest } from "./fetch_methods";
import {
  apiOrder,
  apiSearchCategory,
  apiSearchCategoryById,
  apiSearchProductById,
  apiSearchProductByName,
  apiSearchProductBySku,
  apiSearchProduct,
  apiUserAccount,
  apiUserCart,
  apiUser,
  apiLogin,
  apiRegister,
} from "./dictionary";

export const getOrders = async (token) => {
  return await fetchRequest("GET", apiOrder(), null, token);
};

export const getSearchCategories = async () => {
  return await fetchRequest("GET", apiSearchCategory(), null, null);
};

export const getSearchCategoryById = async (id) => {
  return await fetchRequest("GET", apiSearchCategoryById(id), null, null);
};

export const getSearchProductById = async (id) => {
  return await fetchRequest("GET", apiSearchProductById(id), null, null);
};

export const getSearchProductByName = async (name) => {
  const uri = encodeURIComponent(name.trim());
  return await fetchRequest("GET", apiSearchProductByName(uri), null, null);
};

export const getSearchProductBySku = async (sku) => {
  const uri = encodeURIComponent(sku.trim());
  return await fetchRequest("GET", apiSearchProductBySku(uri), null, null);
};

export const getSearchProduct = async () => {
  return await fetchRequest("GET", apiSearchProduct(), null, null);
};

export const getUserAccount = async (token) => {
  return await fetchRequest("GET", apiUserAccount(), null, token);
};

export const getUserCart = async (token) => {
  return await fetchRequest("GET", apiUserCart(), null, token);
};

export const getUser = async (token) => {
  return await fetchRequest("GET", apiUser(), null, token);
};

export const postLogin = async (email, password) => {
  return await fetchRequest("POST", apiLogin(), {
    email: email,
    password: password,
  });
};

export const postOrder = async (data, token) => {
  return await fetchRequest("POST", apiOrder(), data, token);
};

export const postRegister = async (
  firstName,
  lastName,
  email,
  phone,
  password,
  confirm_password
) => {
  return await fetchRequest("POST", apiRegister(), {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: password,
    confirmPassword: confirm_password,
  });
};

export const updateUserAccount = async (account, token) => {
  return await fetchRequest("PUT", apiUserAccount(), account, token);
};

export const updateUserCart = async (cart, token) => {
  return await fetchRequest("PUT", apiUserCart(), cart, token);
};
