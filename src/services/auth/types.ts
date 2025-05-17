
export interface User {
    id?: string | number;
    email: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
    user?: User;
}

export interface LoginResponse {
    data: AuthTokens;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ApiErrorResponse {
    message?: string;
    error?: string;
    errors?: string | Record<string, string[]>;
    status?: string;
}

export const authKeys = {
    all: ['auth'] as const,
    currentUser: () => [...authKeys.all, 'currentUser'] as const,
}; 