import React from 'react';
import FormActions from './FormActions';
import { ProductFormProps } from './types';

const ProductForm: React.FC<ProductFormProps & {
    onSubmit: (e: React.FormEvent) => void,
    onCancel: () => void,
    isEditing: boolean
}> = ({
    formValues,
    errors,
    handleInputChange,
    isSubmitting,
    onSubmit,
    onCancel,
    isEditing
}) => {
        return (
            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            name="product_name"
                            value={formValues.product_name}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.product_name ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.product_name && (
                            <p className="mt-1 text-sm text-red-500">{errors.product_name}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            SKU *
                        </label>
                        <input
                            type="text"
                            name="sku"
                            value={formValues.sku}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.sku ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.sku && (
                            <p className="mt-1 text-sm text-red-500">{errors.sku}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Brand *
                        </label>
                        <input
                            type="text"
                            name="product_brand"
                            value={formValues.product_brand}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.product_brand ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.product_brand && (
                            <p className="mt-1 text-sm text-red-500">{errors.product_brand}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category *
                        </label>
                        <input
                            type="text"
                            name="product_category"
                            value={formValues.product_category}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.product_category ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.product_category && (
                            <p className="mt-1 text-sm text-red-500">{errors.product_category}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Price *
                        </label>
                        <input
                            type="text"
                            name="product_price"
                            value={formValues.product_price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.product_price ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.product_price && (
                            <p className="mt-1 text-sm text-red-500">{errors.product_price}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="product_quantity"
                            value={formValues.product_quantity}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Discount Percentage
                        </label>
                        <input
                            type="number"
                            name="discount_percentage"
                            value={formValues.discount_percentage}
                            onChange={handleInputChange}
                            min="0"
                            max="100"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.discount_percentage ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.discount_percentage && (
                            <p className="mt-1 text-sm text-red-500">{errors.discount_percentage}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Rating (0-5)
                        </label>
                        <input
                            type="text"
                            name="rating"
                            value={formValues.rating}
                            onChange={handleInputChange}
                            placeholder="0.0"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.rating ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.rating && (
                            <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Shipping Weight
                        </label>
                        <input
                            type="text"
                            name="shipping_weight"
                            value={formValues.shipping_weight}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white"
                            placeholder="0.0"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 sm:gap-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="in_stock"
                                checked={formValues.in_stock}
                                onChange={handleInputChange}
                                id="in_stock"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-white/[0.1]"
                            />
                            <label htmlFor="in_stock" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                In Stock
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="is_featured"
                                checked={formValues.is_featured}
                                onChange={handleInputChange}
                                id="is_featured"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-white/[0.1]"
                            />
                            <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Featured Product
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        name="product_description"
                        value={formValues.product_description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white ${errors.product_description ? 'border-red-500' : 'border-gray-300'
                            }`}
                    ></textarea>
                    {errors.product_description && (
                        <p className="mt-1 text-sm text-red-500">{errors.product_description}</p>
                    )}
                </div>

                <FormActions
                    onCancel={onCancel}
                    isSubmitting={isSubmitting}
                    isEditing={isEditing}
                />
            </form>
        );
    };

export default ProductForm; 