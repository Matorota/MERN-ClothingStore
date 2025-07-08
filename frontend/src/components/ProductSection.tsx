import { useEffect, useState, useTransition } from "react";
import { Product, ProductInput } from "../types/product";
import { postProduct, deleteProduct } from "../api/product";
import { isResponseError } from "../utils/error";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants";
import { getPaginationRange } from "../utils/paginationRange";
import ProductFilter from "./ProductFilter";
import AuthModal from "./AuthModal";
import ModeSelector from "./ModeSelector";
import ProductHeader from "./ProductHeader";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";
import ImageModal from "./ImageModal";
import Pagination from "./Pagination";

type UserMode = "buyer" | "seller" | null;

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showAddForm, setShowAddForm] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [userMode, setUserMode] = useState<UserMode>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [, setSellerToken] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [hasChanged, setHasChanged] = useState(true);
  const [formData, setFormData] = useState<ProductInput>({
    title: "",
    photoSrc: "",
  });
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showImageModal) {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showImageModal]);

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

  const handlePasswordSubmit = async (password: string) => {
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
        setHasChanged(true);
      } else {
        alert(data.message || "Invalid password!");
      }
    } catch (error) {
      alert("Authentication failed. Please try again.");
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
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      setHasChanged(true);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
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

  const handleImageClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowImageModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = "unset";
  };

  const handleUpdateProduct = (id: string) => {
    navigate(`/update-product/${id}`);
  };

  const renderProductSectionContent = () => {
    if (isPending)
      return <p className="text-center text-lg text-gray-600">Loading...</p>;
    if (errorMessage)
      return <p className="text-center text-lg text-red-600">{errorMessage}</p>;
    if (products.length === 0)
      return (
        <p className="text-center text-lg text-gray-600">No products found.</p>
      );

    return products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        userMode={userMode}
        onImageClick={handleImageClick}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
    ));
  };

  const paginationRange = getPaginationRange(page, totalPages);

  if (!userMode) {
    return (
      <>
        <ModeSelector onModeSelect={handleModeSelect} />
        <AuthModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={handlePasswordSubmit}
          isAuthenticating={isAuthenticating}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <ProductHeader userMode={userMode} onLogout={handleLogout} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-10">
          <ProductFilter
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </div>

        <div className="mb-6 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 sm:text-base">
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5 flex-shrink-0 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="whitespace-nowrap">
                Showing {products.length} of {totalItems} products
              </span>
            </span>
            {filters.category !== "all" && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium whitespace-nowrap text-blue-800">
                Category: {filters.category}
              </span>
            )}
            {filters.search && (
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium whitespace-nowrap text-purple-800">
                Search: "{filters.search}"
              </span>
            )}
          </div>
        </div>

        {userMode === "seller" && (
          <div className="mb-10 text-center">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl sm:px-8"
            >
              {showAddForm ? "Cancel" : "Add New Product"}
            </button>
          </div>
        )}

        <ProductForm
          isOpen={showAddForm && userMode === "seller"}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleAddProduct}
          onCancel={() => setShowAddForm(false)}
        />

        <div className="mb-10 rounded-2xl bg-white p-4 shadow-lg sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {renderProductSectionContent()}
          </div>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          paginationRange={paginationRange}
        />
      </div>

      <ImageModal
        isOpen={showImageModal}
        product={selectedProduct}
        userMode={userMode}
        onClose={handleCloseModal}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}
