import { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import { ColumnDefinition, Product } from '../../interface/product';
import DeleteConfirmationModal from '../ui/modal/DeleteConfirmationModal';
import Spinner from '../ui/spinner/Spinner';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";



interface DataTableProps {
    columns: ColumnDefinition[];
    searchPlaceholder?: string;
}

interface CustomTableCellProps {
    colSpan?: number;
    className?: string;
    children: React.ReactNode;
}

export default function DataTable({
    columns,
    searchPlaceholder = 'Search...'
}: DataTableProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [deleteItemName, setDeleteItemName] = useState('');
    const [isProcessingDelete, setIsProcessingDelete] = useState(false);

    const {
        products,
        loading,
        error,
        page,
        limit,
        total,
        searchQuery,
        setPage,
        setLimit,
        setSearchQuery,
        deleteProduct,
    } = useProducts();

    const renderTableCell = (props: CustomTableCellProps) => {
        const { colSpan, className, children } = props;
        return <TableCell colSpan={colSpan} className={className}>{children}</TableCell>;
    };

    const totalPages = Math.ceil(total / limit);
    const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1;
    const showingTo = Math.min(page * limit, total);

    const openDeleteModal = (id: string | number, name: string) => {
        setDeleteItemId(typeof id === 'string' ? parseInt(id, 10) : id);
        setDeleteItemName(name);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteItemId(null);
        setDeleteItemName('');
    };

    const handleDeleteItem = async (id: number) => {
        try {
            setIsProcessingDelete(true);

            await deleteProduct(id);

            closeDeleteModal();
        } catch (error) {
            console.error('Failed to delete item:', error);
        } finally {
            setIsProcessingDelete(false);
        }
    };


    return (
        <div className="space-y-4">
            {/* Search and limit controls */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative">
                    <input
                        type="text"
                        className={`w-full sm:w-64 px-4 py-2 pl-10 pr-10 border rounded-lg focus:outline-none focus:ring-2 
                        ${searchQuery ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:bg-white/[0.03] dark:border-white/[0.1]'}
                        focus:ring-blue-500 dark:text-white transition-colors duration-200`}
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>

                    {searchQuery && (
                        <button
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                            onClick={() => setSearchQuery('')}
                            title="Clear search"
                        >
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 dark:text-gray-400">Show:</label>
                    <select
                        className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {searchQuery && !loading && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Search results for: </span>
                    <span className="mx-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded dark:bg-blue-900/30 dark:text-blue-300">
                        {searchQuery}
                    </span>
                    <span className="ml-1">({total} results)</span>
                    <button
                        className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => setSearchQuery('')}
                    >
                        Clear
                    </button>
                </div>
            )}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="w-full mx-auto divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {loading ? (
                                <TableRow>
                                    {renderTableCell({
                                        colSpan: columns.length + 1,
                                        className: "h-32 text-center align-middle",
                                        children: (
                                            <Spinner size="md" color="primary" className="inline-block" />
                                        )
                                    })}
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    {renderTableCell({
                                        colSpan: columns.length + 1,
                                        className: "h-32 text-center align-middle text-gray-500 dark:text-gray-400",
                                        children: (
                                            <div className="flex flex-col items-center justify-center">
                                                <svg
                                                    className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span className="text-lg font-medium">No data found</span>
                                                {searchQuery && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            No results found for "{searchQuery}"
                                                        </p>
                                                        <button
                                                            className="mt-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                                            onClick={() => setSearchQuery('')}
                                                        >
                                                            Clear search
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </TableRow>
                            ) : (
                                products.map((row: Product) => (
                                    <TableRow key={row.id}>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={`${row.id}-${column.key}`}
                                                className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                                            >
                                                {column.render
                                                    ? column.render(row[column.key as keyof Product], row)
                                                    : String(row[column.key as keyof Product] || '')}
                                            </TableCell>
                                        ))}
                                        <TableCell className="px-5 py-4 text-theme-sm">
                                            <button
                                                onClick={() => {
                                                    const itemName = String(row[columns[0].key as keyof Product] || 'item');
                                                    openDeleteModal(row.id, itemName);
                                                }}
                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                                title="Delete"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
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
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {showingFrom} to {showingTo} of {total} entries
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(Math.max(page - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/[0.1] dark:text-white"
                    >
                        Prev
                    </button>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum = page;
                        if (totalPages > 5 && page > 3) {
                            pageNum = i + (page - 2);
                            if (pageNum > totalPages - 2 && pageNum <= totalPages) {
                                pageNum = totalPages - (4 - i) > 0 ? totalPages - (4 - i) : 1;
                            } else if (pageNum > totalPages) {
                                return null;
                            }
                        } else {
                            pageNum = i + 1;
                        }
                        if (pageNum > totalPages) return null;

                        return (
                            <button
                                key={`page-btn-${pageNum}`}
                                onClick={() => setPage(pageNum)}
                                className={`px-3 py-1 rounded-lg ${pageNum === page
                                    ? 'bg-blue-500 text-white'
                                    : 'border border-gray-300 dark:border-white/[0.1] dark:text-white'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setPage(Math.min(page + 1, totalPages || 1))}
                        disabled={page === totalPages || totalPages === 0}
                        className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/[0.1] dark:text-white"
                    >
                        Next
                    </button>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={() => deleteItemId && handleDeleteItem(deleteItemId)}
                itemName={deleteItemName}
                isLoading={isProcessingDelete}
            />
        </div>
    );
} 