import { ColumnDefinition, Product, SortDirection } from "../../interface/product";
import { getSortIcon } from "../../utility/SortIcon";
import Spinner from "../ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import ProductRow from "./ProductRow";

interface ProductsTableProps {
    columns: ColumnDefinition[];
    products: Product[];
    loading: boolean;
    error: string | null;
    openDeleteModal: (slug: string, name: string) => void;
    onViewDetails: (slug: string) => void;
    onEditProduct: (product: Product) => void;
    sortField: string | null;
    sortDirection: SortDirection;
    onSort: (field: string) => void;
}

export default function ProductsTable({
    columns, products, loading, error, openDeleteModal, onViewDetails, onEditProduct,
    sortField, sortDirection, onSort
}: ProductsTableProps) {
    if (loading) {
        return (
            <div className="w-full overflow-x-auto">
                <Table className="min-w-full table-auto">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} className="h-40 text-center">
                                <div className="flex items-center justify-center">
                                    <Spinner size="md" color="primary" />
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full overflow-x-auto">
                <Table className="min-w-full table-auto">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} className="h-40 text-center text-red-500">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-lg font-medium">Error: {error}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="w-full overflow-x-auto">
                <Table className="min-w-full table-auto">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} className="h-40 text-center text-gray-500 dark:text-gray-400">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-lg font-medium">No data found</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }



    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-full table-auto">
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        {columns.map(column => (
                            <TableCell
                                key={column.key}
                                isHeader
                                className={`px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap ${column.sortable !== false ? 'cursor-pointer group' : ''}`}
                                onClick={() => column.sortable !== false && onSort(column.sortKey || column.key)}
                            >
                                <div className="flex items-center font-medium">
                                    {column.label}
                                    {column.sortable !== false && (
                                        <span className="ml-1 flex-shrink-0">
                                            {getSortIcon(sortDirection, sortField, column.sortKey || column.key)}
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                        ))}
                        <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHeader>

                <TableBody className="w-full mx-auto divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {products.map(row => (
                        <ProductRow
                            key={row.id}
                            row={row}
                            columns={columns}
                            openDeleteModal={openDeleteModal}
                            onViewDetails={onViewDetails}
                            onEditProduct={onEditProduct}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
