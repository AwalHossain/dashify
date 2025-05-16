import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Product } from '../interface/product';
import { deleteProduct as apiDeleteProduct, getProducts } from '../services/product';

export interface PaginatedResponse {
    results: Product[];
    total_items: number;
}

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                page_size: limit.toString(),
            });
            if (searchQuery) {
                params.append('search', searchQuery);
            }

            const data = await getProducts({ page, limit, search: searchQuery });
            setProducts(data.results || []);
            setTotal(data.total_items || 0);
        } catch (err) {
            const error = err as AxiosError<{ message?: string, error?: string }>;
            let msg = 'Something went wrong.';
            if (error.response?.data?.message) {
                msg = error.response.data.message;
            } else if (error.response?.data?.error) {
                msg = error.response.data.error;
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, limit, searchQuery]);

    const previousProducts = [...products];
    const previousTotal = total;
    // Function to handle optimistic product deletion
    const deleteProduct = async (id: number) => {
        try {
            // Save current products for rollback if needed


            // Optimistic update - remove from UI immediately
            setProducts(products.filter(product => product.id !== id));
            setTotal(total - 1);

            // Call API to delete on server
            await apiDeleteProduct(id);

            // Refetch to sync with server if needed
            // Only refetch if the deletion affects pagination, etc.
            if (products.length <= 1 && page > 1) {
                setPage(page - 1);
            }

            return true;
        } catch (error) {
            console.error("Failed to delete product:", error);

            // Restore previous state on error
            setProducts(previousProducts);
            setTotal(previousTotal);

            return false;
        }
    };

    return {
        products,
        loading,
        error,
        page,
        setPage,
        limit,
        setLimit,
        total,
        searchQuery,
        setSearchQuery,
        deleteProduct,
        refetch: fetchProducts,
    };
}
