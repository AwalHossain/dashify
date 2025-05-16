import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', // Fallback URL
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If error is 403 (Unauthorized) and we haven't already tried to refresh
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken) {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_URL}/token/refresh/`,
                        { refresh_token: refreshToken }
                    );

                    const { access_token } = response.data.data;
                    localStorage.setItem('access_token', access_token);

                    originalRequest.headers.Authorization = `Bearer ${access_token}`;

                    // Retry the original request
                    return axios(originalRequest);
                }
            } catch {
                // If refresh token is invalid, redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/signin';
            }
        }

        return Promise.reject(error);
    }
);

export default api; 