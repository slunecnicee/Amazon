import axios from "axios";

const baseURL = "https://digitalinstitute-amazon.azurewebsites.net";

export const baseAPI = axios.create({
  baseURL,
});
