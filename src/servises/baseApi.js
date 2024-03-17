import axios from "axios";

const baseURL = "http://amazon-digital-institute.somee.com";

export const baseAPI = axios.create({
  baseURL,
});
