import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { ColumnDefinition } from "../../interface/product";
import { useDeleteProductMutation, useProductsQuery } from "../../services/productOperations";
import DeleteConfirmationModal from "../ui/modal/DeleteConfirmationModal";
import ProductDetailsModal from "../ui/modal/ProductDetailsModal";
import PaginationControls from "./PaginationControls";
import ProductsTable from "./ProductsTable";
import SearchQuery from "./SearchQuery";

export default function DataTable({ columns }: { columns: ColumnDefinition[] }) {
  const [deleteModal, setDeleteModal] = useState({ open: false, slug: "", name: "" });
  const [detailsModal, setDetailsModal] = useState({ open: false, slug: null as string | null });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Use debounced search value for API calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if ((debouncedSearch || searchQuery === '') && page !== 1) {
      setPage(1);
    }
  }, [debouncedSearch, searchQuery]);


  // React Query hooks for products and delete operation
  const productsQuery = useProductsQuery({ page, limit, search: debouncedSearch });
  const deleteMutation = useDeleteProductMutation();

  // Extract data from the query
  const products = productsQuery.data?.results || [];
  const total = productsQuery.data?.total_items || 0;

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(deleteModal.slug);
    setDeleteModal({ open: false, slug: "", name: "" });
  };

  // Handle product details view
  const handleViewDetails = (slug: string) => {
    setDetailsModal({ open: true, slug });
  };

  // Close product details modal
  const closeDetailsModal = () => {
    setDetailsModal({ open: false, slug: null });
  };

  // Handlers for table data
  const tableProps = {
    columns,
    products,
    loading: productsQuery.isFetching,
    error: productsQuery.error instanceof Error ? productsQuery.error.message : null,
    openDeleteModal: (slug: string, name: string) => {
      setDeleteModal({ open: true, slug, name });
    },
    onViewDetails: handleViewDetails
  };

  return (
    <div className="w-full">
      <SearchQuery
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
      />

      <div className="w-full bg-white dark:bg-slate-800 rounded-md shadow-sm overflow-hidden">
        <ProductsTable {...tableProps} />
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {products.length > 0 ? (page - 1) * limit + 1 : 0} to {Math.min(page * limit, total)} of {total}
        </div>
        <PaginationControls
          page={page}
          totalPages={Math.max(1, Math.ceil(total / limit))}
          onPageChange={setPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.open}
        itemName={deleteModal.name}
        onConfirm={handleDelete}
        onClose={() => setDeleteModal({ open: false, slug: "", name: "" })}
        isLoading={deleteMutation.isPending}
        error={deleteMutation.error instanceof Error ? deleteMutation.error.message : null}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={detailsModal.open}
        onClose={closeDetailsModal}
        productSlug={detailsModal.slug}
      />
    </div>
  );
}
