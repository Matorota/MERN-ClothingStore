import { useState, useEffect } from "react";

interface Category {
  value: string;
  label: string;
  count: number;
}

interface ProductFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    sortBy: string;
    sortOrder: string;
  }) => void;
  currentFilters: {
    search: string;
    category: string;
    sortBy: string;
    sortOrder: string;
  };
}

export default function ProductFilter({
  onFilterChange,
  currentFilters,
}: ProductFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(currentFilters.search);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setLocalSearch(currentFilters.search);
  }, [currentFilters.search]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/api/products/categories`,
      );
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...currentFilters,
      [key]: value,
    });
  };

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    const timeoutId = setTimeout(() => {
      handleFilterChange("search", value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange("search", localSearch);
  };

  const clearFilters = () => {
    setLocalSearch("");
    onFilterChange({
      search: "",
      category: "all",
      sortBy: "_id",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters =
    currentFilters.search !== "" ||
    currentFilters.category !== "all" ||
    currentFilters.sortBy !== "_id" ||
    currentFilters.sortOrder !== "desc";

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 w-full">
        <form onSubmit={handleSearchSubmit} className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2 transition-all duration-300 group-focus-within:from-purple-500 group-focus-within:to-blue-500">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search for products... (e.g., shirt, shoes, jacket)"
            className="w-full rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 py-4 pr-16 pl-16 text-lg font-medium placeholder-gray-500 shadow-lg transition-all duration-300 focus:border-blue-500 focus:from-blue-50 focus:to-purple-50 focus:ring-4 focus:ring-blue-200 focus:outline-none"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                handleFilterChange("search", "");
              }}
              className="group absolute inset-y-0 right-12 flex items-center pr-2"
            >
              <div className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-red-100">
                <svg
                  className="h-4 w-4 text-gray-600 group-hover:text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>
          )}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-2 shadow-md transition-all duration-300 hover:from-green-600 hover:to-emerald-600">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </button>
        </form>
      </div>

      <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-3 rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-purple-50 px-6 py-3 font-semibold text-gray-700 shadow-md transition-all hover:border-purple-300 hover:from-purple-50 hover:to-blue-50 hover:shadow-lg sm:w-auto"
        >
          <div className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </div>
          <span>Advanced Filters</span>
          {hasActiveFilters && (
            <span className="animate-pulse rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              {
                Object.values(currentFilters).filter(
                  (v) => v !== "" && v !== "all" && v !== "_id" && v !== "desc",
                ).length
              }
            </span>
          )}
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex w-full items-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-medium text-red-600 transition-colors hover:bg-red-100 sm:w-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mb-8 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-6">
            <h3 className="text-center text-2xl font-bold text-white">
              Advanced Search & Filters
            </h3>
            <p className="mt-1 text-center text-purple-100">
              Refine your search with detailed filtering options
            </p>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex-shrink-0 rounded-xl bg-blue-100 p-3">
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <label className="block text-lg font-bold text-gray-800">
                      Category
                    </label>
                    <p className="text-sm text-gray-600">
                      Filter by product type
                    </p>
                  </div>
                </div>
                <select
                  value={currentFilters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium shadow-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none lg:text-base"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex-shrink-0 rounded-xl bg-green-100 p-3">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <label className="block text-lg font-bold text-gray-800">
                      Sort By
                    </label>
                    <p className="text-sm text-gray-600">Order your results</p>
                  </div>
                </div>
                <select
                  value={currentFilters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium shadow-sm transition-all focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none lg:text-base"
                >
                  <option value="_id">Date Added</option>
                  <option value="title">Name (A-Z)</option>
                </select>
              </div>

              <div className="space-y-3 md:col-span-2 lg:col-span-1">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex-shrink-0 rounded-xl bg-purple-100 p-3">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <label className="block text-lg font-bold text-gray-800">
                      Order
                    </label>
                    <p className="text-sm text-gray-600">Sort direction</p>
                  </div>
                </div>
                <select
                  value={currentFilters.sortOrder}
                  onChange={(e) =>
                    handleFilterChange("sortOrder", e.target.value)
                  }
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium shadow-sm transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-200 focus:outline-none lg:text-base"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                <h4 className="mb-4 flex items-center justify-center gap-2 text-center text-lg font-bold text-gray-800">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Active Filters
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {currentFilters.search && (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      Search: "{currentFilters.search}"
                      <button
                        onClick={() => {
                          setLocalSearch("");
                          handleFilterChange("search", "");
                        }}
                        className="rounded-full bg-white/20 p-1 transition-colors hover:bg-white/30"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                  {currentFilters.category !== "all" && (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      {
                        categories.find(
                          (c) => c.value === currentFilters.category,
                        )?.label
                      }
                      <button
                        onClick={() => handleFilterChange("category", "all")}
                        className="rounded-full bg-white/20 p-1 transition-colors hover:bg-white/30"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                  {currentFilters.sortBy !== "_id" && (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      Sort:{" "}
                      {currentFilters.sortBy === "title" ? "Name" : "Date"}
                      <button
                        onClick={() => handleFilterChange("sortBy", "_id")}
                        className="rounded-full bg-white/20 p-1 transition-colors hover:bg-white/30"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                  {currentFilters.sortOrder !== "desc" && (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      Order:{" "}
                      {currentFilters.sortOrder === "asc"
                        ? "Oldest First"
                        : "Newest First"}
                      <button
                        onClick={() => handleFilterChange("sortOrder", "desc")}
                        className="rounded-full bg-white/20 p-1 transition-colors hover:bg-white/30"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
