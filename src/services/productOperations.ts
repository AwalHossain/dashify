import { Product } from "../interface/product";
import { getProducts } from "./product";

/**
 * Service function to fetch products with pagination and search
 */

export const fetchProducts = async (
    page: number,
    limit: number,
    search = ''
) => {
    try {
        const data = await getProducts({ page, limit, search });
        return {
            products: data.results ?? [],
            total: data.total_items ?? 0,
            error: null
        };
    } catch (err) {
        return {
            products: [],
            total: 0,
            error: err instanceof Error ? err.message : 'Something went wrong'
        };
    }
};


export const optimisticDeleteProduct = (
    products: Product[],
    idOrSlug: number | string,
    callbacks: {
        onSuccess: (updatedProducts: Product[], deletedProduct: Product, newTotal: number) => void;
        onError: (message: string) => void;
    }
) => {
    // Find the product to delete
    const productToDelete = products.find(p =>
        p.id === idOrSlug || p.slug === idOrSlug
    );

    if (!productToDelete) {
        callbacks.onError(`Item with identifier ${idOrSlug} not found.`);
        return null;
    }

    // Filter out the product
    const updatedProducts = products.filter(product =>
        !(product.id === productToDelete.id || product.slug === productToDelete.slug)
    );

    // Calculate new total
    const newTotal = products.length - 1;

    // Call success callback with updated data
    callbacks.onSuccess(updatedProducts, productToDelete, newTotal);

    return productToDelete;
}; 