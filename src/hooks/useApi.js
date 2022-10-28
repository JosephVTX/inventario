import axios from "axios";
import { useEffect, useState } from "react";

export const useApi = (URL, refresh = false, search = "") => {
  const [data, setData] = useState([]);
  const options = { method: "GET", url: URL, headers: {

    Authorization: `Bearer ${localStorage.getItem("token")}`,
    
  } };

  useEffect(() => {
    axios.request(options).then((response) => setData(response.data.data));
  }, [refresh, search]);

  return { data };
};


/* import axios from "axios";

const options = {
  method: 'DELETE',
  url: 'https://inventario-api.ga/api/products/69',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2OTE5NDM2LCJleHAiOjE2Njk1MTE0MzZ9.8RQ8wBVua9WhorOZaRyCUhT8HlLBdz6pfK1DqQW-tTE'
  },
  data: {identifier: 'susy', password: 'EliaSusy75@'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
}); */