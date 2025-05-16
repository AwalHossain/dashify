import { useState } from 'react';
import { useAlert } from '../context/AlertContext';
import { Product } from '../interface/product';
import { optimisticDeleteProduct } from '../services/productOperations';

interface UseProductDeleteProps {
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    products: Product[];
    setSkipNextFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UseProductDeleteReturn {
    isProcessingDelete: boolean;
    deleteItemId: string | number | null;
    deleteItemName: string;
    isDeleteModalOpen: boolean;
    openDeleteModal: (id: number | string, name?: string) => void;
    closeDeleteModal: () => void;
    handleDeleteItem: (id: number | string) => void;
}

/**
 * Hook for handling product deletion with optimistic updates
 */
export default function useProductDelete({
    setProducts,
    setTotal,
    products,
    setSkipNextFetch
}: UseProductDeleteProps): UseProductDeleteReturn {
    const [isProcessingDelete, setIsProcessingDelete] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | string | null>(null);
    const [deleteItemName, setDeleteItemName] = useState('');

    const { showAlert } = useAlert();

    const openDeleteModal = (id: number | string, name: string = 'item') => {
        setDeleteItemId(id);
        const productToDelete = products.find(p => p.id === id || p.slug === id);
        setDeleteItemName(name || productToDelete?.product_name || String(id));
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteItemId(null);
        setDeleteItemName('');
    };

    const handleDeleteItem = (idOrSlug: number | string) => {
        if (!idOrSlug) return;

        // Start optimistic delete 
        setIsProcessingDelete(true);

        // Set flag to skip next fetch
        setSkipNextFetch(true);

        // Perform optimistic delete using the service
        optimisticDeleteProduct(products, idOrSlug, {
            onSuccess: (updatedProducts, deletedProduct, newTotal) => {
                // Update state with updated products
                setProducts(updatedProducts);
                setTotal(newTotal);

                // Close modal
                closeDeleteModal();

                // Show success notification after a short delay
                setTimeout(() => {
                    setIsProcessingDelete(false);

                    // Show alerts
                    const itemName = deletedProduct.product_name || deleteItemName;
                    showAlert('success', 'Removed', `${itemName} was removed from the view.`);
                    showAlert('info', 'Note', 'This is an optimistic delete. The item will reappear when you refresh the page.');
                }, 100);
            },
            onError: (message) => {
                setIsProcessingDelete(false);
                showAlert('error', 'Error', message);
            }
        });
    };

    return {
        isProcessingDelete,
        deleteItemId,
        deleteItemName,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        handleDeleteItem
    };
} 