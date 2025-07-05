type UserMode = "buyer" | "seller" | null;

interface ProductHeaderProps {
  userMode: UserMode;
  onLogout: () => void;
}

export default function ProductHeader({
  userMode,
  onLogout,
}: ProductHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h1 className="mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              {userMode === "buyer"
                ? "Discover Products"
                : "Product Management"}
            </h1>
            <p className="text-base text-gray-600 sm:text-lg">
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
              onClick={onLogout}
              className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Switch Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
