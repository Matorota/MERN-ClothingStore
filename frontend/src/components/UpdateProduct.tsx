import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, postProduct, updateProduct } from "../api/product";
import { isResponseError } from "../utils/error";
import { Product } from "../types/product";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ title: "", photoSrc: "" });

  useEffect(() => {
    getProducts().then((response) => {
      if (!isResponseError(response)) {
        const found = response.data.products.find((p: Product) => p._id === id);
        if (found) {
          setProduct(found);
          setFormData({ title: found.title, photoSrc: found.photoSrc });
        }
      }
    });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.photoSrc) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await updateProduct(product?._id ?? "", {
        title: formData.title,
        photoSrc: formData.photoSrc,
      });
      if (isResponseError(response)) {
        alert(response.error.message);
        return;
      }
      alert("Product updated!");
      navigate("/");
    } catch (error) {
      alert("Failed to update product.");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <section className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Update Product</h2>
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
        onClick={handleUpdate}
        className="rounded-md bg-blue-300 px-2 py-1 font-medium text-white"
      >
        Update Product
      </button>
    </section>
  );
}
