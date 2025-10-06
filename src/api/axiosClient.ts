import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 10000,
});

// Minimal response interceptor to unify errors
axiosClient.interceptors.response.use(
    (res) => res,
    (err) => {
        // You could toast/log here
        return Promise.reject(err);
    }
);
