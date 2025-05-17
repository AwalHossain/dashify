import React from 'react';
import { SortDirection } from '../../interface/product';

interface SortableColumnHeaderProps {
    label: string;
    sortField: string | null;
    sortDirection: SortDirection;
    columnKey: string;
    sortKey?: string;
    isSortable?: boolean;
    onSort: (field: string) => void;
}

const SortableColumnHeader: React.FC<SortableColumnHeaderProps> = ({
    label,
    sortField,
    sortDirection,
    columnKey,
    sortKey,
    isSortable = true,
    onSort
}) => {
    if (!isSortable) {
        return <span className="font-medium">{label}</span>;
    }

    const actualSortKey = sortKey || columnKey;
    const isCurrentSortField = sortField === actualSortKey;

    // Render sort indicator
    const renderSortIcon = () => {
        if (!isCurrentSortField) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-50" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            );
        }

        if (sortDirection === 'asc') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
            );
        }

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        );
    };

    return (
        <div
            className="flex items-center font-medium cursor-pointer group"
            onClick={() => onSort(actualSortKey)}
        >
            {label}
            <span className="ml-1 flex-shrink-0">
                {renderSortIcon()}
            </span>
        </div>
    );
};

export default SortableColumnHeader; 