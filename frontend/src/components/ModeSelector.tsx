interface ModeSelectorProps {
  onModeSelect: (mode: "buyer" | "seller") => void;
}

export default function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-12">
          <h1 className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            Product Management System
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Choose your access mode to begin exploring our comprehensive product
            management platform
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-2xl gap-8 md:grid-cols-2">
          <button
            onClick={() => onModeSelect("buyer")}
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
            onClick={() => onModeSelect("seller")}
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
    </div>
  );
}
