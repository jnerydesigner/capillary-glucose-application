import axios from "axios";

export const ApiAxios = axios.create({
  baseURL: "http://localhost:3444",
});
