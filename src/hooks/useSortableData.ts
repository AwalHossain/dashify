import { useMemo, useState } from "react";
import { SortDirection } from "../interface/product";

/**
 * A custom hook for handling sortable data
 * @param data The data to sort
 * @returns Sorted data and sort state management
 */
export function useSortableData<T>(data: T[]) {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);


    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
            if (sortDirection === 'desc') {
                setSortField(null);
            }
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };


    const sortedData = useMemo(() => {
        if (!sortField || !sortDirection || data.length === 0) {
            return data;
        }

        return [...data].sort((a, b) => {
            const aValue = a[sortField as keyof T];
            const bValue = b[sortField as keyof T];


            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue);
                return sortDirection === 'asc' ? comparison : -comparison;
            }


            const aNum = typeof aValue === 'string' ? parseFloat(aValue) : Number(aValue);
            const bNum = typeof bValue === 'string' ? parseFloat(bValue) : Number(bValue);

            if (!isNaN(aNum) && !isNaN(bNum)) {
                return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
            }

            if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return sortDirection === 'asc'
                    ? (aValue === bValue ? 0 : aValue ? 1 : -1)
                    : (aValue === bValue ? 0 : aValue ? -1 : 1);
            }


            return 0;
        });
    }, [data, sortField, sortDirection]);

    return {
        sortedData,
        sortField,
        sortDirection,
        handleSort
    };
} 