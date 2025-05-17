import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../components/products/DataTable";
import Badge from "../../components/ui/badge/Badge";
import Tooltip from "../../components/ui/tooltip/Tooltip";
import { ColumnDefinition, Product } from "../../interface/product";


export default function BasicTables() {
  const productColumns: ColumnDefinition[] = [
    {
      key: "product_name",
      label: "Product",
      render: (value: unknown, row: Product) => (
        <div className="flex items-center gap-4 pl-2">
          <div className="relative w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center dark:bg-gray-800 shadow-sm">
            {/* Product Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package-search-icon lucide-package-search"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" /><path d="m7.5 4.27 9 5.15" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /><circle cx="18.5" cy="15.5" r="2.5" /><path d="M20.27 17.27 22 19" /></svg>

            {/* Featured Badge */}
            {row.is_featured && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                FEATURED
              </span>
            )}

            {/* Discount Badge */}
            {row.discount_percentage > 0 && (
              <span className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                {row.discount_percentage}% OFF
              </span>
            )}
          </div>

          <div className="min-w-[120px] max-w-[200px]">
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 truncate">
              {String(value)}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400 truncate">
              {row.product_brand}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "product_category",
      label: "Category",
    },
    {
      key: "product_price",
      label: "Price",
      render: (value: unknown, row: Product) => {
        const originalPrice = parseFloat(String(value));
        const discountedPrice = originalPrice * (1 - row.discount_percentage / 100);

        return (
          <div>
            {row.discount_percentage > 0 ? (
              <>
                <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 line-through text-xs text-gray-400">
                  ${originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-medium">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        );
      },
    },
    {
      key: "product_quantity",
      label: "Quantity",
      render: (value: unknown) => {
        const quantity = Number(value);
        return (
          <Tooltip content={quantity <= 10 ? "Low stock" : "In stock"} position="top">
            <span className={quantity <= 10 ? "text-amber-500 font-medium" : ""}>
              {quantity}
            </span>
          </Tooltip>
        );
      },
    },
    {
      key: "in_stock",
      label: "Status",
      render: (value: unknown) => {
        const inStock = Boolean(value);
        return (
          <Badge
            size="sm"
            color={inStock ? "success" : "error"}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        );
      },
    },
    {
      key: "rating",
      label: "Rating",
      render: (value: unknown) => {
        const rating = Number(value);
        return (
          <div className="flex items-center">
            <span className="mr-1">{rating.toFixed(1)}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${rating > i ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageMeta
        title="Products Table"
        description="Products table with pagination, search and delete functionality"
      />
      <PageBreadcrumb pageTitle="Products" />
      <div className="space-y-6">
        <ComponentCard
          title="Products Table"
          desc="Products table with pagination, search and delete functionality"
        >
          <DataTable
            columns={productColumns}
          />
        </ComponentCard>
      </div>
    </>
  );
}
