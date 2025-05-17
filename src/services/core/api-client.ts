import axios from 'axios';
import { setupRequestInterceptors, setupResponseInterceptors } from './interceptors';


const createApiClient = () => {
    const apiClient = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', // Fallback URL
        headers: {
            'Content-Type': 'application/json',
        },
    });

    setupRequestInterceptors(apiClient);
    setupResponseInterceptors(apiClient);

    return apiClient;
};


const api = createApiClient();

export default api; 