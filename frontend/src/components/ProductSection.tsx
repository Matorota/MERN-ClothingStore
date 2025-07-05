import { useEffect, useState, useTransition } from "react";
import { Product, ProductInput } from "../types/product";
import { postProduct, deleteProduct } from "../api/product";
import { isResponseError } from "../utils/error";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants";
import { getPaginationRange } from "../utils/paginationRange";
import ProductSearch from "../utils/ProductSeach";
import ProductFilter from "./ProductFilter";

type UserMode = "buyer" | "seller" | null;

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showAddForm, setShowAddForm] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [userMode, setUserMode] = useState<UserMode>(null);
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [sellerToken, setSellerToken] = useState<string | null>(null);

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

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (token) {
      verifyExistingToken(token);
    }
  }, []);

  const verifyExistingToken = async (token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/api/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setSellerToken(token);
        setUserMode("seller");
        setHasChanged(true);
      } else {
        localStorage.removeItem("sellerToken");
      }
    } catch (error) {
      localStorage.removeItem("sellerToken");
    }
  };

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
    if (hasChanged && userMode) {
      fetchProducts(page, filters.search, filters);
    }
  }, [hasChanged, page, userMode]);

  useEffect(() => {
    if (userMode) {
      fetchProducts(1, filters.search, filters);
      setPage(1);
    }
  }, [filters, userMode]);

  const handleModeSelect = (mode: UserMode) => {
    if (mode === "seller") {
      setShowPasswordModal(true);
    } else {
      setUserMode(mode);
      setHasChanged(true);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password.trim()) {
      alert("Please enter a password!");
      return;
    }

    setIsAuthenticating(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/api/auth/seller`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSellerToken(data.token);
        localStorage.setItem("sellerToken", data.token);
        setUserMode("seller");
        setShowPasswordModal(false);
        setPassword("");
        setHasChanged(true);
      } else {
        alert(data.message || "Invalid password!");
        setPassword("");
      }
    } catch (error) {
      alert("Authentication failed. Please try again.");
      setPassword("");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    setSellerToken(null);
    setUserMode(null);
    setProducts([]);
    setFilters({
      search: "",
      category: "all",
      sortBy: "_id",
      sortOrder: "desc",
    });
    setSearch("");
  };

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

        {userMode === "seller" && (
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
        )}

        {userMode === "buyer" && (
          <div className="mt-auto flex gap-4 pb-4">
            <button className="rounded-md bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-600">
              Buy Now
            </button>
            <button className="rounded-md bg-purple-500 px-3 py-1 text-sm font-medium text-white hover:bg-purple-600">
              Add to Cart
            </button>
          </div>
        )}
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

  if (!userMode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <h1 className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
              Product Management System
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
              Choose your access mode to begin exploring our comprehensive
              product management platform
            </p>
          </div>

          <div className="mx-auto mb-12 grid max-w-2xl gap-8 md:grid-cols-2">
            <button
              onClick={() => handleModeSelect("buyer")}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transition-transform group-hover:scale-110">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Customer Portal
                </h2>
                <p className="leading-relaxed text-gray-600">
                  Browse our curated collection, discover amazing products, and
                  shop with confidence
                </p>
              </div>
            </button>

            <button
              onClick={() => handleModeSelect("seller")}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transition-transform group-hover:scale-110">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h2>
                <p className="leading-relaxed text-gray-600">
                  Manage your inventory, add new products, and control your
                  business operations
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Secure Access Required
                </div>
              </div>
            </button>
          </div>
        </div>

        {showPasswordModal && (
          <div className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 backdrop-blur-sm">
            <div className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Admin Access
                </h3>
                <p className="mt-2 text-gray-600">
                  Enter your credentials to continue
                </p>
              </div>

              <div className="space-y-6">
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    !isAuthenticating &&
                    handlePasswordSubmit()
                  }
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none"
                  autoFocus
                  disabled={isAuthenticating}
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword("");
                    }}
                    className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
                    disabled={isAuthenticating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordSubmit}
                    disabled={isAuthenticating}
                    className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-medium text-white transition-all hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
                  >
                    {isAuthenticating
                      ? "Authenticating..."
                      : "Access Dashboard"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent">
                {userMode === "buyer"
                  ? "Discover Products"
                  : "Product Management"}
              </h1>
              <p className="text-lg text-gray-600">
                {userMode === "buyer"
                  ? "Explore our carefully curated collection of premium products"
                  : "Efficiently manage your product inventory and catalog"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  userMode === "buyer"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {userMode === "buyer" ? "Customer Mode" : "Admin Mode"}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Switch Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-10 flex flex-col items-center space-y-8">
          <div className="w-full max-w-2xl">
            <div className="mb-4 text-center">
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Search Products
              </h2>
              <p className="text-gray-600">
                Find exactly what you're looking for
              </p>
            </div>
            <ProductSearch
              value={search}
              onSearch={handleSearchChange}
              onClear={() => handleSearchChange("")}
            />
          </div>

          <div className="w-full max-w-4xl">
            <ProductFilter
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <span>
              Showing {products.length} of {totalItems} products
            </span>
            {filters.category !== "all" && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                Category: {filters.category}
              </span>
            )}
          </div>
        </div>

        {userMode === "seller" && (
          <div className="mb-10 text-center">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
            >
              {showAddForm ? "Cancel" : "Add New Product"}
            </button>
          </div>
        )}

        {showAddForm && userMode === "seller" && (
          <div className="mx-auto mb-10 max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
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
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none"
                  placeholder="Enter product name..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="photoSrc"
                  value={formData.photoSrc}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none"
                  placeholder="Paste image URL here..."
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-emerald-700"
              >
                Create Product
              </button>
            </div>
          </div>
        )}

        <div className="mb-10 rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-wrap justify-center gap-6">
            {renderProductSectionContent()}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`rounded-xl px-6 py-3 font-semibold transition-all ${
                page === 1
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "bg-white text-gray-700 shadow-md hover:bg-gray-50 hover:shadow-lg"
              }`}
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`rounded-xl px-6 py-3 font-semibold transition-all ${
                page === totalPages
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "bg-white text-gray-700 shadow-md hover:bg-gray-50 hover:shadow-lg"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
