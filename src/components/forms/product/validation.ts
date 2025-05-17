import { ProductFormValues } from "./types";

/**
 * Validates the product form and returns any errors
 */
export const validateProductForm = (formValues: ProductFormValues): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Required fields
    if (!formValues.product_name.trim()) errors.product_name = 'Product name is required';
    if (!formValues.product_category.trim()) errors.product_category = 'Category is required';
    if (!formValues.product_brand.trim()) errors.product_brand = 'Brand is required';
    if (!formValues.sku.trim()) errors.sku = 'SKU is required';

    // Price validation
    if (!formValues.product_price.trim()) {
        errors.product_price = 'Price is required';
    } else {
        const price = parseFloat(formValues.product_price);
        if (isNaN(price) || price < 0) errors.product_price = 'Price must be a positive number';
    }

    // Rating validation
    if (formValues.rating.trim()) {
        const rating = parseFloat(formValues.rating);
        if (isNaN(rating) || rating < 0 || rating > 5) {
            errors.rating = 'Rating must be between 0 and 5';
        }
    }

    // Discount validation
    if (formValues.discount_percentage < 0 || formValues.discount_percentage > 100) {
        errors.discount_percentage = 'Discount must be between 0 and 100';
    }

    return errors;
};

/**
 * Prepares form values for API submission
 */
export const prepareFormPayload = (formValues: ProductFormValues) => {
    return {
        ...formValues,
        product_price: parseFloat(formValues.product_price).toString(),
        rating: parseFloat(formValues.rating).toString(),
        shipping_weight: parseFloat(formValues.shipping_weight).toString(),
        product_quantity: Number(formValues.product_quantity),
        discount_percentage: Number(formValues.discount_percentage),
    };
}; 