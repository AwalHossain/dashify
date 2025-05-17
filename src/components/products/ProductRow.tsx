import { ColumnDefinition, Product } from "../../interface/product";
import { TableCell, TableRow } from "../ui/table";

interface ProductRowProps {
    row: Product;
    columns: ColumnDefinition[];
    openDeleteModal: (slug: string, name: string) => void;
    onViewDetails: (slug: string) => void;
    onEditProduct: (product: Product) => void;
}

export default function ProductRow({ row, columns, openDeleteModal, onViewDetails, onEditProduct }: ProductRowProps) {
    return (
        <TableRow
            key={row.id}
            onClick={() => {
                if (row.slug) {
                    onViewDetails(row.slug);
                }
            }}
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
        >
            {columns.map(column => (
                <TableCell
                    key={`${row.id}-${column.key}`}
                    className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap"
                >
                    {column.render
                        ? column.render(row[column.key as keyof Product], row)
                        : String(row[column.key as keyof Product] || '')}
                </TableCell>
            ))}

            <TableCell className="px-5 py-4 text-theme-sm whitespace-nowrap flex items-center gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        const itemName = String(row[columns[0].key as keyof Product] || 'item');
                        if (row.slug) {
                            openDeleteModal(row.slug, itemName);
                        }
                    }}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    title="Delete"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                {/* Edit button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditProduct(row);
                    }}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    title="Edit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </TableCell>
        </TableRow>
    );
}
