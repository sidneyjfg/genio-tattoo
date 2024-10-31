// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Altere para a URL do backend em produção
});

export default api;
