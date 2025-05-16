export const ENDPOINTS = {
    LOGIN: "/token/",
    LOAD_USER: "/auth/check-session",
    TOKEN_REFRESH: "/token/refresh/",
    PRODUCTS: {
        LIST: "/product",
        DELETE: (id: string | number) => `/product/${id}`,
        CREATE: "/product",
        UPDATE: (id: string | number) => `/product/${id}`,
        GET: (id: string | number) => `/product/${id}`,
    }
};