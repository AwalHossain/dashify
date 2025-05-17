import React from 'react';
import Spinner from '../../ui/spinner/Spinner';
import { FormActionsProps } from './types';

/**
 * Form action buttons for the product form
 */
const FormActions: React.FC<FormActionsProps> = ({ onCancel, isSubmitting, isEditing }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 z-10">
            <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:text-white transition-colors"
                disabled={isSubmitting}
            >
                Cancel
            </button>
            <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 transition-colors flex items-center justify-center min-w-[100px]"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Spinner size="sm" color="primary" />
                ) : (
                    isEditing ? 'Save Changes' : 'Add Product'
                )}
            </button>
        </div>
    );
};

export default FormActions; 