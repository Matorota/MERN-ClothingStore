import { Product } from "../types/product";

type UserMode = "buyer" | "seller" | null;

interface ImageModalProps {
  isOpen: boolean;
  product: Product | null;
  userMode: UserMode;
  onClose: () => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ImageModal({
  isOpen,
  product,
  userMode,
  onClose,
  onUpdate,
  onDelete,
}: ImageModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors duration-200 hover:bg-black/70"
        >
          <svg
            className="h-6 w-6"
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

        <div className="max-h-[70vh] w-full overflow-hidden">
          <img
            src={product.photoSrc}
            alt={product.title}
            className="h-full w-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081";
            }}
          />
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
            {product.title}
          </h2>

          <div className="flex justify-center gap-4">
            {userMode === "seller" && (
              <>
                <button
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-600"
                  onClick={() => {
                    onClose();
                    onUpdate(product._id);
                  }}
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Update Product
                </button>
                <button
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-600"
                  onClick={() => {
                    onClose();
                    onDelete(product._id);
                  }}
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
                  Delete Product
                </button>
              </>
            )}

            {userMode === "buyer" && (
              <>
                <button className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-600">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Buy Now
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-purple-500 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-purple-600">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H3m4 10v6a1 1 0 001 1h12a1 1 0 001-1v-6m-8 6V9a1 1 0 00-1-1H6a1 1 0 00-1 1v10z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </>
            )}
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Press <kbd className="rounded bg-gray-200 px-2 py-1">Esc</kbd> or
            click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}
