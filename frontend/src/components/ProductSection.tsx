import { useEffect, useState, useTransition } from "react";
import { Product, ProductInput } from "../types/product";
import { postProduct, deleteProduct } from "../api/product";
import { isResponseError } from "../utils/error";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants";
import { getPaginationRange } from "../utils/paginationRange";
import ProductSearch from "../utils/ProductSeach";
import ProductFilter from "./ProductFilter";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showAddForm, setShowAddForm] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [hasChanged, setHasChanged] = useState(true);
  const [formData, setFormData] = useState<ProductInput>({
    title: "",
    photoSrc: "",
  });

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sortBy: "_id",
    sortOrder: "desc",
  });

  const navigate = useNavigate();

  const fetchProducts = async (
    currentPage: number = page,
    searchTerm: string = filters.search,
    currentFilters = filters,
  ) => {
    startTransition(async () => {
      const searchParam = searchTerm
        ? `&search=${encodeURIComponent(searchTerm)}`
        : "";
      const categoryParam =
        currentFilters.category !== "all"
          ? `&category=${currentFilters.category}`
          : "";
      const sortByParam = `&sortBy=${currentFilters.sortBy}`;
      const sortOrderParam = `&sortOrder=${currentFilters.sortOrder}`;

      const queryString = `page=${currentPage}&pageSize=${pageSize}${searchParam}${categoryParam}${sortByParam}${sortOrderParam}`;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/api/products?${queryString}`,
      );
      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
        return;
      }

      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalItems(data.pagination?.totalItems || 0);
      setErrorMessage("");
      setHasChanged(false);
    });
  };

  useEffect(() => {
    if (hasChanged) {
      fetchProducts(page, filters.search, filters);
    }
  }, [hasChanged, page]);

  useEffect(() => {
    fetchProducts(1, filters.search, filters);
    setPage(1);
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      setHasChanged(true);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setSearch(newFilters.search);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (!formData.title || !formData.photoSrc) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await postProduct({
        title: formData.title,
        photoSrc: formData.photoSrc,
      });
      if (isResponseError(response)) {
        alert(response.error.message);
        return;
      }
      alert("Product added successfully!");
      setFormData({ title: "", photoSrc: "" });
      setShowAddForm(false);
      setHasChanged(true);
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const response = await deleteProduct(id);
      if (isResponseError(response)) {
        alert(response.error.message || "Failed to delete product.");
        return;
      }
      setHasChanged(true);
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  const renderProductSectionContent = () => {
    if (isPending) return <p className="text-lg text-gray-600">Loading...</p>;
    if (errorMessage)
      return <p className="text-lg text-red-600">{errorMessage}</p>;

    if (products.length === 0) {
      return <p className="text-lg text-gray-600">No products found.</p>;
    }

    return products.map((product) => (
      <div
        key={product._id}
        className="flex w-64 flex-col items-center overflow-hidden rounded-lg border border-slate-200 shadow-md transition-shadow hover:shadow-lg"
      >
        <div className="h-80 w-full">
          <img
            src={product.photoSrc}
            alt={product.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081";
            }}
          />
        </div>
        <div className="p-2">
          <p className="text-center font-medium">{product.title}</p>
        </div>
        <div className="mt-auto flex gap-4 pb-4">
          <button
            className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
            onClick={() => navigate(`/update-product/${product._id}`)}
          >
            Update
          </button>
          <button
            className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
            onClick={() => handleDeleteProduct(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    const paginationRange = getPaginationRange(page, totalPages);

    return (
      <div className="flex items-center gap-2">
        {paginationRange.map((item, index) => {
          if (typeof item === "string") {
            return (
              <span key={index} className="px-2 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <button
              key={index}
              onClick={() => handlePageChange(item)}
              className={`rounded-lg px-3 py-1 font-medium transition-all ${
                page === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Product Gallery
          </h1>
          <p className="text-xl text-gray-600">
            Discover and manage your product collection
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl rounded-2xl border border-white/30 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">
              Search Products
            </h3>
            <div className="flex flex-col items-center">
              <ProductSearch
                value={search}
                onSearch={handleSearchChange}
                onClear={() => handleSearchChange("")}
              />
            </div>
            {filters.search && (
              <div className="mt-4 rounded-lg bg-blue-50 p-3 text-center">
                <p className="text-sm text-blue-700">
                  Showing {totalItems} results for "
                  <span className="font-bold">{filters.search}</span>"
                </p>
              </div>
            )}
          </div>
        </div>

        <ProductFilter
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />

        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {products.length} of {totalItems} products
            {filters.category !== "all" && (
              <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                Category: {filters.category}
              </span>
            )}
          </p>
        </div>

        <div className="mb-10 text-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            {showAddForm ? "Cancel" : "Add Product"}
          </button>
        </div>

        {showAddForm && (
          <div className="mx-auto mb-12 max-w-lg rounded-2xl border border-white/30 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Create New Product
            </h2>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter an amazing product name..."
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="photoSrc"
                  placeholder="Paste your product image URL here..."
                  value={formData.photoSrc}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </div>
        )}

        <div className="mb-10 rounded-2xl border border-white/20 bg-white/50 p-8 shadow-lg backdrop-blur-sm">
          <div className="flex flex-wrap justify-center gap-6">
            {renderProductSectionContent()}
          </div>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
              page === 1
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-white text-gray-700 shadow-md hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg"
            }`}
          >
            ← Previous
          </button>
          {renderPagination()}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`rounded-xl px-6 py-3 font-semibold transition-all duration-200 ${
              page === totalPages
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-white text-gray-700 shadow-md hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
