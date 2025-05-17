import { Product } from "../../../interface/product";

export interface ProductFormValues {
    product_name: string;
    product_description: string;
    product_price: string;
    product_quantity: number;
    product_category: string;
    product_brand: string;
    rating: string;
    in_stock: boolean;
    sku: string;
    discount_percentage: number;
    is_featured: boolean;
    shipping_weight: string;
}

export interface ProductFormProps {
    formValues: ProductFormValues;
    errors: Record<string, string>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    isSubmitting: boolean;
}

export interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    productToEdit?: Product | null;
}

export interface FormActionsProps {
    onCancel: () => void;
    isSubmitting: boolean;
    isEditing: boolean;
}

export const initialFormValues: ProductFormValues = {
    product_name: '',
    product_description: '',
    product_price: '',
    product_quantity: 0,
    product_category: '',
    product_brand: '',
    rating: '0.0',
    in_stock: true,
    sku: '',
    discount_percentage: 0,
    is_featured: false,
    shipping_weight: '0',
}; 