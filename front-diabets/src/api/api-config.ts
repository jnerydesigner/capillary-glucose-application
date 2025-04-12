import axios from "axios";

export const ApiAxios = axios.create({
  baseURL: "http://localhost:3444",
});

// ApiAxios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   console.log(config.url);

//   if (token && config.url !== "/auth/login") {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
