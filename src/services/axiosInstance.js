import axios from "axios";

let url = "http://localhost:8080";

export const axiosConfig = {
    baseURL: url
};


export const axiosInstance = axios.create(axiosConfig);