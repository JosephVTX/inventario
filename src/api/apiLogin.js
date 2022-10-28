import axios from "axios";
import envData from "../env/envData";

const { URL_BASE } = envData;

export const apiLogin = (loginData) => {
  return axios
    .post(`${URL_BASE}/api/auth/local`, loginData)
    .then((res) => localStorage.setItem("token", res.data.jwt));
};
