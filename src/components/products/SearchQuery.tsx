import { ChangeEvent } from 'react';

interface SearchQueryProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    page_size: number;
    setPage_size: (n: number) => void;
    setPage: (n: number) => void;
    searchPlaceholder?: string;
}

export default function SearchQuery({
    searchQuery,
    setSearchQuery,
    page_size,
    setPage_size,
    setPage,
    searchPlaceholder = 'Search...',
}: SearchQueryProps) {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex items-center justify-between w-full gap-2">
            <div className="relative flex-grow max-w-xs">
                <input
                    type="text"
                    className={`w-full p-1.5 xs:p-2 pl-8 pr-8 text-sm border rounded-lg focus:outline-none focus:ring-2 
            ${searchQuery ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:bg-white/[0.03] dark:border-white/[0.1]'}
            focus:ring-blue-500 dark:text-white transition-colors duration-200`}
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <svg
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                        onClick={() => { setSearchQuery(''); setPage(1); }}
                        title="Clear search"
                        aria-label="Clear search"
                    >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="flex items-center gap-1 whitespace-nowrap">
                <label className="text-xs xs:text-sm text-gray-500 dark:text-gray-400">Show:</label>
                <select
                    className="px-1 py-1 text-xs xs:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.03] dark:border-white/[0.1] dark:text-white"
                    value={page_size}
                    onChange={e => { setPage_size(Number(e.target.value)); setPage(1); }}
                    aria-label="Number of items per page"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
        </div>
    );
}
