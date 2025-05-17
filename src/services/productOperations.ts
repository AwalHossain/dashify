import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Product } from "../interface/product";
import api from "./api";
import { ENDPOINTS } from "./endpoints";


interface ProductsQueryParams {
    page: number;
    limit: number;
    search?: string;
}

interface PaginatedProductsResponse {
    results: Product[];
    total_items: number;
}

interface ApiErrorResponse {
    message?: string;
    error?: string;
    errors?: string | Record<string, string[]>;
    status?: string;
}


export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (params: ProductsQueryParams) => [...productKeys.lists(), params] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: number | string) => [...productKeys.details(), id] as const,
};


export const fetchProducts = async ({ page, limit, search }: ProductsQueryParams): Promise<PaginatedProductsResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        page_size: limit.toString(),
    });

    if (search) {
        params.append('search', search);
    }

    try {
        const response = await api.get<{ data: PaginatedProductsResponse }>(`${ENDPOINTS.PRODUCTS.LIST}?${params.toString()}`);
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        if (error.response?.data) {
            const apiError = error.response.data;
            let errorMessage = 'Failed to fetch products.';
            if (apiError.message) errorMessage = apiError.message;
            else if (apiError.error) errorMessage = apiError.error;
            else if (typeof apiError.errors === 'string') errorMessage = apiError.errors;
            else if (typeof apiError.errors === 'object' && apiError.errors !== null) {
                const fieldErrors = Object.values(apiError.errors).flat().join(', ');
                if (fieldErrors) errorMessage = fieldErrors;
            }
            throw new Error(errorMessage);
        }
        throw new Error('Network error or unable to fetch products.');
    }
};

// Fetch single product details
export const fetchProductDetails = async (slug: string): Promise<Product> => {
    try {
        const response = await api.get<{ data: Product }>(ENDPOINTS.PRODUCTS.GET(slug));
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        if (error.response?.data) {
            const apiError = error.response.data;
            let errorMessage = 'Failed to fetch product details.';
            if (apiError.message) errorMessage = apiError.message;
            else if (apiError.error) errorMessage = apiError.error;
            else if (typeof apiError.errors === 'string') errorMessage = apiError.errors;
            else if (typeof apiError.errors === 'object' && apiError.errors !== null) {
                const fieldErrors = Object.values(apiError.errors).flat().join(', ');
                if (fieldErrors) errorMessage = fieldErrors;
            }
            throw new Error(errorMessage);
        }
        throw new Error('Network error or unable to fetch product details.');
    }
};

// Add a new product
export const addProduct = async (productData: Omit<Product, 'id' | 'slug' | 'created_at'>): Promise<Product> => {
    try {
        const response = await api.post<{ data: Product }>(ENDPOINTS.PRODUCTS.CREATE, productData);
        return response.data.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Failed to add product.';

        if (error.response?.data) {
            const apiError = error.response.data;
            if (apiError.message) errorMessage = apiError.message;
            else if (apiError.error) errorMessage = apiError.error;
            else if (typeof apiError.errors === 'string') errorMessage = apiError.errors;
            else if (typeof apiError.errors === 'object' && apiError.errors !== null) {
                const fieldErrors = Object.values(apiError.errors).flat().join(', ');
                if (fieldErrors) errorMessage = fieldErrors;
            }
        }
        throw new Error(errorMessage);
    }
};

export const deleteProduct = async (productId: string | number): Promise<void> => {
    try {
        await api.delete(ENDPOINTS.PRODUCTS.DELETE(productId));

        console.log(`Product with ID ${productId} successfully deleted`);
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
        let errorMessage = 'Failed to delete product.';

        if (error.response?.data) {
            const apiError = error.response.data;
            if (apiError.message) errorMessage = apiError.message;
            else if (apiError.error) errorMessage = apiError.error;
        }
        throw new Error(errorMessage);
    }
};

// hook for fetching products
export function useProductsQuery(params: ProductsQueryParams) {
    return useQuery({
        queryKey: productKeys.list(params),
        queryFn: () => fetchProducts(params),
        placeholderData: (previousData) => previousData,
    });
}

// hook for fetching a single product
export function useProductDetailsQuery(slug: string | null) {
    return useQuery<Product | null, Error>({
        queryKey: productKeys.detail(slug || ''),
        queryFn: () => slug ? fetchProductDetails(slug) : Promise.resolve(null),
        enabled: !!slug, // Only run the query if there's a slug
    });
}

//hook for adding a product
export function useAddProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            // Invalidate and refetch products lists
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
}

// hook for deleting a product
export function useDeleteProductMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            // Invalidate and refetch products lists
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
}
