import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: "https://hirenest-sua2.onrender.com/api",
});
// Attach JWT Token
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});

// Global Error Handler
API.interceptors.response.use(
    (response) => response,

    (error) => {

        if (!error.response) {
            toast.error("Server is unreachable.");
        }

        else if (error.response.status === 401) {
            toast.error(error.response.data.message);
        }

        else if (error.response.status === 403) {
            toast.error("Access denied.");
        }

        else if (error.response.status === 404) {
            toast.error("Resource not found.");
        }

        else if (error.response.status >= 500) {
            toast.error("Internal server error.");
        }

        return Promise.reject(error);
    }
);

export default API;