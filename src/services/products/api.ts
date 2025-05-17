import { AxiosError } from "axios";
import { Product } from "../../interface/product";
import { api } from "../core";
import { ENDPOINTS } from "../endpoints";
import {
    ApiErrorResponse,
    ApiFormError,
    ProductDetailsApiResponse,
    ProductFormData,
    ProductListData,
    ProductsApiResponse,
    ProductsQueryParams
} from "./types";

/**
 * Fetch a paginated list of products with optional filtering
 */
export const fetchProducts = async ({ page = 1, limit = 10, search = "" }: ProductsQueryParams): Promise<ProductListData> => {
    try {
        const response = await api.get<ProductsApiResponse>(ENDPOINTS.PRODUCTS.LIST, {
            params: { page, limit, search },
        });
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Failed to fetch products.';
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

/**
 * Fetch details of a single product by ID
 */
export const fetchProductDetails = async (productId: string | null): Promise<Product | null> => {
    if (!productId) {
        return null;
    }
    try {
        const response = await api.get<ProductDetailsApiResponse>(ENDPOINTS.PRODUCTS.GET(productId));
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Failed to fetch product details.';
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

/**
 * Add a new product
 */
export const addProduct = async (productData: ProductFormData): Promise<Product> => {
    try {
        const response = await api.post<{ data: Product }>(ENDPOINTS.PRODUCTS.CREATE, productData);
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        if (error.response?.data?.errors && typeof error.response.data.errors === 'object') {
            throw new ApiFormError(
                error.response.data.message || "Validation failed. Please check the form.",
                error.response.data.errors as Record<string, string[] | string>
            );
        } else {
            let errorMessage = 'Failed to add product.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (typeof error.response?.data?.errors === 'string') {
                errorMessage = error.response.data.errors;
            } else if (error.message) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (productId: string): Promise<void> => {
    try {
        await api.delete(ENDPOINTS.PRODUCTS.DELETE(productId));
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Failed to delete product.';
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (typeof error.response?.data?.errors === 'string') {
            errorMessage = error.response.data.errors;
        } else if (error.message) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

/**
 * Update an existing product
 */
export const updateProduct = async ({ id, productData }: { id: string; productData: Partial<ProductFormData> }): Promise<Product> => {
    try {
        const response = await api.patch<{ data: Product }>(ENDPOINTS.PRODUCTS.UPDATE(id), productData);
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Failed to update product.';
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (typeof error.response?.data?.errors === 'string') {
            errorMessage = error.response.data.errors;
        } else if (error.response?.data?.errors && typeof error.response.data.errors === 'object') {
            const fieldErrors = Object.values(error.response.data.errors as Record<string, string[]>).flat().join(', ');
            if (fieldErrors) errorMessage = fieldErrors;
        } else if (error.message) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
}; 