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

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const clearFilters = () => {
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
    <div className="mx-auto mb-8 w-full max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md transition-shadow hover:shadow-lg"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            />
          </svg>
          Filters{" "}
          {hasActiveFilters && (
            <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">
              Active
            </span>
          )}
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {isOpen && (
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                value={currentFilters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Sort By
              </label>
              <select
                value={currentFilters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="_id">Date Added</option>
                <option value="title">Name (A-Z)</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Order
              </label>
              <select
                value={currentFilters.sortOrder}
                onChange={(e) =>
                  handleFilterChange("sortOrder", e.target.value)
                }
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="mb-3 text-sm font-semibold text-gray-700">
                Active Filters:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentFilters.search && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                    Search: "{currentFilters.search}"
                    <button
                      onClick={() => handleFilterChange("search", "")}
                      className="hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {currentFilters.category !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                    {
                      categories.find(
                        (c) => c.value === currentFilters.category,
                      )?.label
                    }
                    <button
                      onClick={() => handleFilterChange("category", "all")}
                      className="hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {currentFilters.sortBy !== "_id" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                    Sort: {currentFilters.sortBy === "title" ? "Name" : "Date"}
                    <button
                      onClick={() => handleFilterChange("sortBy", "_id")}
                      className="hover:text-purple-600"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
