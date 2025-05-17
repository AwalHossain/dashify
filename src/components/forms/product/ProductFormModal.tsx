import React, { useEffect, useState } from 'react';
import { useAlert } from '../../../context/AlertContext';
import { ApiFormError, useAddProductMutation, useUpdateProductMutation } from '../../../services/products';
import { Modal } from '../../ui/modal';
import ProductForm from './ProductForm';
import { ProductFormModalProps, ProductFormValues, initialFormValues } from './types';
import { prepareFormPayload, validateProductForm } from './validation';

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, productToEdit }) => {
    const [formValues, setFormValues] = useState<ProductFormValues>(initialFormValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { showAlert } = useAlert();

    const addProductMutation = useAddProductMutation();
    const updateProductMutation = useUpdateProductMutation();

    const isEditing = !!productToEdit;
    const mutationInProgress = addProductMutation.isPending || updateProductMutation.isPending;

    useEffect(() => {
        if (isOpen) {
            setErrors({});
            if (isEditing && productToEdit) {
                setFormValues({
                    product_name: productToEdit.product_name || '',
                    product_description: productToEdit.product_description || '',
                    product_price: String(productToEdit.product_price || ''),
                    product_quantity: productToEdit.product_quantity || 0,
                    product_category: productToEdit.product_category || '',
                    product_brand: productToEdit.product_brand || '',
                    rating: String(productToEdit.rating || '0.0'),
                    in_stock: productToEdit.in_stock || true,
                    sku: productToEdit.sku || '',
                    discount_percentage: productToEdit.discount_percentage || 0,
                    is_featured: productToEdit.is_featured || false,
                    shipping_weight: String(productToEdit.shipping_weight || '0'),
                });
            } else {
                setFormValues(initialFormValues);
            }
        }
    }, [isOpen, productToEdit, isEditing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormValues(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormValues(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateProductForm(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = prepareFormPayload(formValues);

        try {
            if (isEditing && productToEdit) {
                if (!productToEdit.slug) {
                    showAlert('error', 'Update Error', 'Product slug is missing, cannot update.');
                    return;
                }
                await updateProductMutation.mutateAsync({ id: productToEdit.slug, productData: payload });
            } else {
                await addProductMutation.mutateAsync(payload);
            }
            onClose();
        } catch (error) {
            if (error instanceof ApiFormError) {
                setErrors(error.fieldErrors);
            } else {
                console.error("Submission failed in modal with non-APIFormError:", error);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
            <div className="p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-4 sm:mb-6  z-10 pb-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl text-center mx-auto font-bold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <ProductForm
                    formValues={formValues}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    isSubmitting={mutationInProgress}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    isEditing={isEditing}
                />
            </div>
        </Modal>
    );
};

export default ProductFormModal; 