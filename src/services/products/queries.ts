import { useQuery } from "@tanstack/react-query";
import { Product } from "../../interface/product";
import { fetchProductDetails, fetchProducts } from "./api";
import { ProductListData, ProductsQueryParams } from "./types";


export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: ProductsQueryParams) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: string | null) => [...productKeys.details(), id] as const,
};


export function useProductsQuery(params: ProductsQueryParams) {
    return useQuery<ProductListData, Error>({
        queryKey: productKeys.list(params),
        queryFn: () => fetchProducts(params),
        placeholderData: (previousData) => previousData,
    });
}


export function useProductDetailsQuery(slug: string | null) {
    return useQuery<Product | null, Error>({
        queryKey: productKeys.detail(slug),
        queryFn: () => fetchProductDetails(slug),
        enabled: !!slug,
    });
} 