import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "../../context/AlertContext";
import { loginUserApi, logoutUserClient } from "./api";
import { AuthTokens, LoginCredentials } from "./types";

/**
 * Mutation hook for logging in
 */
export const useLoginMutation = () => {
    const { showAlert } = useAlert();

    return useMutation<AuthTokens, Error, LoginCredentials>({
        mutationFn: loginUserApi,
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            showAlert('success', 'Login Successful', 'Welcome back!');
        },
        onError: (error: Error) => {
            showAlert('error', 'Login Failed', error.message || 'An unexpected error occurred.');
        },
    });
};

/**
 * Mutation hook for logging out
 */
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: logoutUserClient,
        onSuccess: () => {
            queryClient.resetQueries();
            showAlert('success', 'Logged Out', 'You have been successfully logged out.');
        },
        onError: (error: Error) => {
            showAlert('error', 'Logout Failed', error.message || 'An error occurred during logout.');
        },
    });
}; 