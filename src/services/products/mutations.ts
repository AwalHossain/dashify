import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "../../context/AlertContext";
import { Product } from "../../interface/product";
import { addProduct, deleteProduct, updateProduct } from "./api";
import { productKeys } from "./queries";
import { ApiFormError, ProductFormData } from "./types";

/**
 * Hook for adding a new product
 */
export const useAddProductMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation<Product, Error | ApiFormError, ProductFormData>({
        mutationFn: addProduct,
        onSuccess: (data) => {
            showAlert('success', 'Product Added', `${data.product_name} has been successfully added.`);
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
            if (data.slug) {
                queryClient.invalidateQueries({ queryKey: productKeys.detail(data.slug) });
            }
        },
        onError: (error) => {
            if (error instanceof ApiFormError) {
                showAlert('error', 'Validation Failed', error.message || 'Please check the form for errors and try again.');
            } else {
                showAlert('error', 'Add Failed', (error as Error).message || 'Could not add the product.');
            }
        },
    });
};

/**
 * Hook for deleting a product
 */
export function useDeleteProductMutation() {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation<void, Error, string>({
        mutationFn: deleteProduct,
        onSuccess: () => {
            showAlert('success', 'Product Deleted', 'The product has been successfully deleted.');
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
        onError: (error: Error) => {
            showAlert('error', 'Delete Failed', error.message || 'Could not delete the product.');
        },
    });
}

/**
 * Hook for updating an existing product
 */
export const useUpdateProductMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation<Product, Error, { id: string; productData: Partial<ProductFormData> }>({
        mutationFn: updateProduct,
        onSuccess: (data) => {
            showAlert('success', 'Product Updated', `${data.product_name} has been successfully updated.`);
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
            if (data.slug) {
                queryClient.invalidateQueries({ queryKey: productKeys.detail(data.slug) });
            }
        },
        onError: (error: Error) => {
            showAlert('error', 'Update Failed', error.message || 'Could not update the product.');
        },
    });
}; 