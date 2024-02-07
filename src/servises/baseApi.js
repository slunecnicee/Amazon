import axios from "axios";

const baseURL = "https://digitalamazon.azurewebsites.net/";

export const baseAPI = axios.create({
  baseURL,
});
