import { useEffect, useState, useTransition } from "react";
import { Product, ProductInput } from "../types/product";
import { getProducts, postProduct } from "../api/product"; //deleteProduct
import { isResponseError } from "../utils/error";
import { useNavigate } from "react-router-dom";
export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [hasChanged, setHasChanged] = useState(true);
  const [formData, setFormData] = useState<ProductInput>({
    title: "",
    photoSrc: "",
  });

  const navigate = useNavigate();
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
      const response = await fetch(`http://localhost:8030/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        alert("Failed to delete product.");
        return;
      }
      setHasChanged(true); // Refresh product list
    } catch (error) {
      alert("Failed to delete product.");
    }
  };
  const fetchProducts = async () => {
    startTransition(async () => {
      const response = await getProducts();
      if (isResponseError(response)) {
        setErrorMessage(response.error.message);
        return;
      }
      setProducts(response.data.products);
      setHasChanged(false);
    });
  };

  useEffect(() => {
    if (hasChanged) fetchProducts();
  }, [hasChanged]);

  const renderProductSectionContent = () => {
    if (isPending) return <p>Loading...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;

    return products.map((product) => (
      <div
        key={product._id}
        className="flex w-48 flex-col items-center overflow-hidden rounded-lg border border-slate-200 shadow-md"
      >
        <div className="w-full">
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
          <p className="font-medium">{product.title}</p>
        </div>
        <div>
          <button
            className="mr-4 mb-4 rounded-md bg-blue-300 px-2 py-1 font-medium text-white"
            onClick={() => navigate(`/update-product/${product._id}`)}
          >
            Update
          </button>
          <button
            className="mb-4 rounded-md bg-red-400 px-2 py-1 font-medium text-white"
            onClick={() => handleDeleteProduct(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">List of Products from the Backend</h1>
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleInputChange}
          className="rounded-md border border-slate-300 px-2 py-1"
        />
        <input
          type="text"
          name="photoSrc"
          placeholder="Photo URL"
          value={formData.photoSrc}
          onChange={handleInputChange}
          className="rounded-md border border-slate-300 px-2 py-1"
        />
        <button
          onClick={handleAddProduct}
          className="rounded-md bg-blue-300 px-2 py-1 font-medium text-white"
        >
          Add Product
        </button>
      </div>
      <div className="flex gap-4">{renderProductSectionContent()}</div>
    </section>
  );
}
