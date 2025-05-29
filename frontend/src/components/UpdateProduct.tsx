import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, updateProduct } from "../api/product";
import { isResponseError } from "../utils/error";
import { Product } from "../types/product";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ title: "", photoSrc: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      let page = 1;
      let found: Product | null = null;
      let keepFetching = true;
      while (keepFetching && !found) {
        const response = await getProducts(page, 50);
        if (isResponseError(response)) break;
        found =
          response.data.products.find((p: Product) => p._id === id) || null;
        if (
          response.data.pagination.currentPage >=
          response.data.pagination.totalPages
        ) {
          keepFetching = false;
        } else {
          page++;
        }
      }
      if (found) {
        setProduct(found);
        setFormData({ title: found.title, photoSrc: found.photoSrc });
      }
      setLoading(false);
    };
    fetchProduct();
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

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

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
