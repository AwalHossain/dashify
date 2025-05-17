import { AxiosError } from "axios";
import { api } from "../core";
import { ENDPOINTS } from "../endpoints";
import { ApiErrorResponse, AuthTokens, LoginCredentials } from "./types";


export const loginUserApi = async ({ email, password }: LoginCredentials): Promise<AuthTokens> => {
    try {
        const response = await api.post(ENDPOINTS.LOGIN, { email, password });
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Login failed. Please check your credentials.';

        if (error.response?.data) {
            const apiError = error.response.data;
            errorMessage = apiError.message || apiError.error || (typeof apiError.errors === 'string' ? apiError.errors : errorMessage);

            if (typeof apiError.errors === 'object' && apiError.errors !== null) {
                const fieldErrors = Object.values(apiError.errors).flat().join(', ');
                if (fieldErrors) errorMessage = fieldErrors;
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your network connection.';
        }

        throw new Error(errorMessage);
    }
};


export const logoutUserClient = async (): Promise<void> => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Any other cleanup can be done here
};


export const refreshAccessToken = async (refreshToken: string): Promise<AuthTokens> => {
    try {
        const response = await api.post(ENDPOINTS.TOKEN_REFRESH, { refresh_token: refreshToken });
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Failed to refresh token.';

        if (error.response?.data) {
            const apiError = error.response.data;
            errorMessage = apiError.message || apiError.error || (typeof apiError.errors === 'string' ? apiError.errors : errorMessage);
        }

        throw new Error(errorMessage);
    }
}; 