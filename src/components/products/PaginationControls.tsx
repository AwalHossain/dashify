interface PaginationControlsProps {
    page: number;
    totalPages: number;
    onPageChange: (n: number) => void;
}

export default function PaginationControls({
    page, totalPages, onPageChange
}: PaginationControlsProps) {
    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    // Generate page numbers to display with ellipsis
    const getPageNumbers = () => {
        const pageNumbers = [];

        // Always include page 1
        pageNumbers.push(1);

        const startPage = Math.max(2, page - 1);
        const endPage = Math.min(totalPages - 1, page + 1);

        // Add ellipsis if there's a gap after page 1
        if (startPage > 2) {
            pageNumbers.push('...');
        }

        // Add pages around current page
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Add ellipsis if there's a gap before the last page
        if (endPage < totalPages - 1 && totalPages > 1) {
            pageNumbers.push('...');
        }

        // Always include the last page if it exists
        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-2 sm:px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
                Previous
            </button>

            {getPageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="text-gray-500 dark:text-gray-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${pageNum}`}
                        onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
                        className={`
                            px-2 sm:px-3 py-2 text-sm rounded min-w-[40px] text-center
                            ${page === pageNum
                                ? 'bg-blue-500 text-white font-medium'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                            }
                        `}
                    >
                        {pageNum}
                    </button>
                )
            ))}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-2 sm:px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
                Next
            </button>
        </div>
    );
}
