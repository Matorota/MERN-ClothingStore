import { useEffect, useState, useTransition } from "react";
import { Product, ProductInput } from "../types/product";
import { getProducts, postProduct } from "../api/product";
import { isResponseError } from "../utils/error";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [hasChanged, setHasChanged] = useState(true);
  const [formData, setFormData] = useState<ProductInput>({
    id: "",
    title: "",
    photoSrc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (!formData.id || !formData.title || !formData.photoSrc) {
      alert("Please fill in all fields.");
      return;
    }

    // Convert id to a number if required by the backend
    const numericId = parseInt(formData.id.toString(), 10);
    if (isNaN(numericId)) {
      alert("ID must be a valid number.");
      return;
    }

    try {
      const response = await postProduct({
        id: numericId,
        title: formData.title,
        photoSrc: formData.photoSrc,
      });
      if (isResponseError(response)) {
        alert(response.error.message);
        return;
      }
      alert("Product added successfully!");
      setFormData({ id: "", title: "", photoSrc: "" });
      setHasChanged(true);
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
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
          />
        </div>
        <div className="p-2">
          <p className="font-medium">{product.title}</p>
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
          name="id"
          placeholder="Id for clothes"
          value={formData.id}
          onChange={handleInputChange}
          className="rounded-md border border-slate-300 px-2 py-1"
        />
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
