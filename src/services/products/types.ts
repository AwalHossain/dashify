import { Product } from "../../interface/product";

// Form data structure for creating/updating products
export interface ProductFormData {
    product_name?: string;
    product_description?: string;
    product_price?: string;
    product_quantity?: number;
    product_category?: string;
    product_brand?: string;
    rating?: string;
    in_stock?: boolean;
    sku?: string;
    discount_percentage?: number;
    is_featured?: boolean;
    shipping_weight?: string;
}

// Interface for product list data
export interface ProductListData {
    results: Product[];
    total_items: number;
    active_page: number;
    current_page: number;
    total_pages: number;
    next: string | null;
    previous: string | null;
    page_size: number;
}

// Products list API response
export interface ProductsApiResponse {
    data: ProductListData;
}

// Single product API response
export interface ProductDetailsApiResponse {
    data: Product;
}

// Query parameters for product lists
export interface ProductsQueryParams {
    page: number;
    limit: number;
    search?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}

// API error response
export interface ApiErrorResponse {
    message?: string;
    error?: string;
    errors?: Record<string, string[] | string> | string;
    status?: string;
    detail?: string;
}

// Custom error for field-specific validation errors from the API
export class ApiFormError extends Error {
    fieldErrors: Record<string, string>;

    constructor(message: string, fieldErrors: Record<string, string[] | string>) {
        super(message);
        this.name = 'ApiFormError';
        this.fieldErrors = {};
        for (const key in fieldErrors) {
            if (Object.prototype.hasOwnProperty.call(fieldErrors, key)) {
                const errorValue = fieldErrors[key];
                this.fieldErrors[key] = Array.isArray(errorValue) ? errorValue[0] : errorValue;
            }
        }
        Object.setPrototypeOf(this, ApiFormError.prototype);
    }
} 