import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api',
    withCredentials: true
})

export const getRequests = () => api.get('/get');
export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);