import React from 'react';
import { Product } from '../../../interface/product';
import { useProductDetailsQuery } from '../../../services/products';
import Badge from '../badge/Badge';
import Spinner from '../spinner/Spinner';
import { Modal } from './index';

interface ProductDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    productSlug: string | null;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
    isOpen,
    onClose,
    productSlug,
}) => {
    // Fetch product details with React Query
    const {
        data,
        isLoading,
        error,
    } = useProductDetailsQuery(productSlug);

    // Type assertion - we know the structure from our API
    const product = data as Product | undefined;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className='w-full max-w-2xl'>
            <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto no-scrollbar overflow-x-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Product Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-chart-gantt-icon lucide-square-chart-gantt"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 8h7" /><path d="M8 12h6" /><path d="M11 16h5" /></svg>
                    </button>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <Spinner size="lg" color="primary" />
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                        {error instanceof Error ? error.message : 'An error occurred while fetching product details'}
                    </div>
                )}

                {!isLoading && product && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package-search-icon lucide-package-search"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" /><path d="m7.5 4.27 9 5.15" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /><circle cx="18.5" cy="15.5" r="2.5" /><path d="M20.27 17.27 22 19" /></svg>

                                {product.is_featured && (
                                    <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2">
                                        <Badge color="primary" size="sm">Feature</Badge>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h4 className="text-xl font-medium text-gray-900 dark:text-white">
                                    {product.product_name}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {product.product_brand}
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                                    ${parseFloat(product.product_price).toFixed(2)}
                                    {product.discount_percentage > 0 && (
                                        <span className="ml-2 text-sm line-through text-gray-400">
                                            ${(parseFloat(product.product_price) * (1 + product.discount_percentage / 100)).toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {product.discount_percentage > 0 && (
                                    <Badge color="error" size="sm">{product.discount_percentage}% OFF</Badge>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Category</h5>
                                <p className="text-gray-900 dark:text-white">{product.product_category}</p>
                            </div>

                            <div>
                                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Stock Status</h5>
                                <Badge color={product.in_stock ? "success" : "error"}>
                                    {product.in_stock ? "In Stock" : "Out of Stock"}
                                </Badge>
                            </div>

                            <div>
                                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Quantity</h5>
                                <p className="text-gray-900 dark:text-white">{product.product_quantity}</p>
                            </div>

                            <div>
                                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Rating</h5>
                                <div className="flex items-center">
                                    <span className="mr-1">{Number(product.rating).toFixed(1)}</span>
                                    <div className="flex">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`h-4 w-4 ${Number(product.rating) > i ? "text-yellow-400" : "text-gray-300"}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</h5>
                            <p className="text-gray-700 dark:text-gray-300">
                                {product.product_description || "No description available."}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex justify-end mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailsModal; 