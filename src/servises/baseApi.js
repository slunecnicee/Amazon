
import axios from "axios";

const baseURL= 'https://amazon-digital-prod.azurewebsites.net'

export const baseAPI=axios.create({
    baseURL,
})