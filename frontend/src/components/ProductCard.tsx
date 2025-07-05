import { Product } from "../types/product";

type UserMode = "buyer" | "seller" | null;

interface ProductCardProps {
  product: Product;
  userMode: UserMode;
  onImageClick: (product: Product, e: React.MouseEvent) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  userMode,
  onImageClick,
  onUpdate,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="group mx-auto flex w-full max-w-xs flex-col items-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div
        className="relative aspect-square w-full cursor-pointer overflow-hidden"
        onClick={(e) => onImageClick(product, e)}
      >
        <img
          src={product.photoSrc}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm">
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-4">
        <h3 className="line-clamp-2 flex min-h-[3.5rem] items-center justify-center text-center text-lg leading-tight font-bold text-gray-900">
          {product.title}
        </h3>
      </div>

      <div className="w-full px-4 pb-4">
        {userMode === "seller" && (
          <div className="flex w-full gap-2">
            <button
              className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate(product._id);
              }}
            >
              Update
            </button>
            <button
              className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product._id);
              }}
            >
              Delete
            </button>
          </div>
        )}

        {userMode === "buyer" && (
          <div className="flex w-full gap-2">
            <button
              className="flex-1 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-600"
              onClick={(e) => e.stopPropagation()}
            >
              Buy Now
            </button>
            <button
              className="flex-1 rounded-lg bg-purple-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-purple-600"
              onClick={(e) => e.stopPropagation()}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
