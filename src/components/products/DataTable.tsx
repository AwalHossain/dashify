import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { ColumnDefinition, Product } from "../../interface/product";
import { useDeleteProductMutation, useProductsQuery } from "../../services/products";
import DeleteConfirmationModal from "../ui/modal/DeleteConfirmationModal";
import ProductDetailsModal from "../ui/modal/ProductDetailsModal";
import ProductFormModal from "../ui/modal/ProductFormModal";
import PaginationControls from "./PaginationControls";
import ProductsTable from "./ProductsTable";
import SearchQuery from "./SearchQuery";

export default function DataTable({ columns }: { columns: ColumnDefinition[] }) {
  const [deleteModal, setDeleteModal] = useState({ open: false, slug: "", name: "" });
  const [detailsModal, setDetailsModal] = useState({ open: false, slug: null as string | null });
  const [productFormModal, setProductFormModal] = useState<{ open: boolean; productToEdit: Product | null }>({ open: false, productToEdit: null });

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


  const productsQuery = useProductsQuery({ page, limit, search: debouncedSearch });
  const deleteMutation = useDeleteProductMutation();

  const products = productsQuery.data?.results || [];
  const total = productsQuery.data?.total_items || 0;
  console.log(productsQuery.data, 'productsQuery.data');

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

  // Handle product edit
  const handleEditProduct = (product: Product) => {
    setProductFormModal({ open: true, productToEdit: product });
  };

  // Close product form modal
  const closeProductFormModal = () => {
    setProductFormModal({ open: false, productToEdit: null });
  };

  // Open product form modal for adding a new product
  const handleOpenAddModal = () => {
    setProductFormModal({ open: true, productToEdit: null });
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
    onViewDetails: handleViewDetails,
    onEditProduct: handleEditProduct,
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <SearchQuery
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
        />
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-offset-gray-800 text-sm whitespace-nowrap"
        >
          Add New Product
        </button>
      </div>

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

      {/* Product Form Modal for Add/Edit */}
      <ProductFormModal
        isOpen={productFormModal.open}
        onClose={closeProductFormModal}
        productToEdit={productFormModal.productToEdit}
      />
    </div>
  );
}
