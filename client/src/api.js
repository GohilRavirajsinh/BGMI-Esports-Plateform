import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Ye interceptor har request se pehle chalega aur bag me token (VIP Pass) daal dega!
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Yahan 'Bearer' hai, backend me 'BGMI' kiya tha dhyan rakhna!
    }
    return config;
});
export default api;