import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';


export const setupRequestInterceptors = (apiInstance: AxiosInstance): void => {
    apiInstance.interceptors.request.use(
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
};


export const setupResponseInterceptors = (apiInstance: AxiosInstance): void => {
    apiInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            // If error is 403 (Unauthorized) and we haven't already tried to refresh
            if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
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
}; 