import axios from "axios";
import envData from "../env/envData";

const { URL_BASE } = envData;

export const getProducts = () => {
  return axios.get(`${URL_BASE}/api/products`);
};

export const apiPostProduct = (product) => {
    const options = {
        method: "POST",
        url: `${URL_BASE}/api/products/`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: product
        }
      };
    
      return axios.request(options)
};

export const apiPutProduct = (id, product) => {
  const options = {
    method: "PUT",
    url: `${URL_BASE}/api/products/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      data: product
    }
  };

  return axios.request(options)
    
};

export const apiDeleteProduct = (id) => {
  const options = {
    method: "DELETE",
    url: `${URL_BASE}/api/products/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.request(options);
};

