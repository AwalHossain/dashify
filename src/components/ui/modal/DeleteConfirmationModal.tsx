import React from 'react';
import { Modal } from './index';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
    title?: string;
    message?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    isLoading?: boolean;
    error?: string | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName = 'item',
    title = 'Confirm Deletion',
    message,
    confirmButtonText = 'Delete',
    cancelButtonText = 'Cancel',
    isLoading = false,
    error = null,
}) => {
    const defaultMessage = `Are you sure you want to delete this ${itemName}? This action cannot be undone.`;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className='w-[400px]'>
            <div className="p-6 md:p-8">
                <div className="flex items-center justify-center mb-4 md:mb-6">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 dark:bg-red-500/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-center text-gray-900 mb-3 dark:text-white">
                    {title}
                </h3>

                <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    {message || defaultMessage}
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 justify-center mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:text-white transition-colors"
                        disabled={isLoading}
                    >
                        {cancelButtonText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500 transition-colors flex items-center justify-center min-w-[100px]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            confirmButtonText
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmationModal; 