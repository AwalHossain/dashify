import { ReactElement } from "react";


export interface Product {
    id: number;
    product_name: string;
    slug: string | null;
    product_description: string;
    product_price: string;
    product_quantity: number;
    product_category: string;
    product_brand: string;
    rating: string;
    in_stock: boolean;
    created_at: string;
    sku: string;
    discount_percentage: number;
    is_featured: boolean;
    shipping_weight: string;
}


export interface ColumnDefinition {
    key: string;
    label: string;
    render?: (value: unknown, row: Product) => ReactElement;
    sortable?: boolean;
    sortKey?: string;
}

export type SortDirection = 'asc' | 'desc' | null;