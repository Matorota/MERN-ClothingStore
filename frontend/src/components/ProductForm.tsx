import { ProductInput } from "../types/product";

interface ProductFormProps {
  isOpen: boolean;
  formData: ProductInput;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  isOpen,
  formData,
  onInputChange,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  if (!isOpen) return null;

  return (
    <div className="mx-auto mb-10 max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
      <h2 className="mb-6 text-center text-xl font-bold text-gray-900 sm:text-2xl">
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
            onChange={onInputChange}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none sm:text-base"
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
            onChange={onInputChange}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none sm:text-base"
            placeholder="Paste image URL here..."
          />
        </div>
        <button
          onClick={onSubmit}
          className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-emerald-700"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}
