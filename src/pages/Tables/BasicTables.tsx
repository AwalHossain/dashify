import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../components/products/DataTable";
import Badge from "../../components/ui/badge/Badge";
import Ribbon from "../../components/ui/ribbon/Ribbon";
import Tooltip from "../../components/ui/tooltip/Tooltip";
import { ColumnDefinition, Product } from "../../interface/product";


export default function BasicTables() {
  const productColumns: ColumnDefinition[] = [
    {
      key: "product_name",
      label: "Product",
      render: (value: unknown, row: Product) => (
        <div className="flex items-center gap-4 pl-2">
          <div className="relative w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center dark:bg-gray-800 overflow-visible">
            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>

            {row.is_featured && (
              <div className="absolute -top-2 -right-1">
                <Ribbon
                  text="Featured"
                  color="primary"
                  className="text-center rounded-tl-sm"
                />
              </div>
            )}

            {row.discount_percentage > 0 && (
              <div className="absolute -bottom-2 -left-1">
                <Ribbon
                  text={`${row.discount_percentage}% OFF`}
                  color="error"
                  className="text-center rounded-br-sm"
                />
              </div>
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
        <ComponentCard title="Products Table">
          <DataTable
            columns={productColumns}
          />
        </ComponentCard>
      </div>
    </>
  );
}
