import axios from 'axios';

const API_URL = 'https://expense-backend-1-hnul.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axiosInstance;