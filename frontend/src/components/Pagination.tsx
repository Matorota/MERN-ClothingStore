interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  paginationRange: (number | string)[];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  paginationRange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-full rounded-xl px-4 py-3 font-semibold transition-all sm:w-auto sm:px-6 ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white text-gray-700 shadow-md hover:bg-gray-50 hover:shadow-lg"
        }`}
      >
        Previous
      </button>

      <div className="hidden items-center gap-2 sm:flex">
        {paginationRange.map((item, index) => {
          if (typeof item === "string") {
            return (
              <span key={index} className="px-2 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <button
              key={index}
              onClick={() => onPageChange(item)}
              className={`rounded-lg px-3 py-1 font-medium transition-all ${
                currentPage === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-600 sm:hidden">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-full rounded-xl px-4 py-3 font-semibold transition-all sm:w-auto sm:px-6 ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white text-gray-700 shadow-md hover:bg-gray-50 hover:shadow-lg"
        }`}
      >
        Next
      </button>
    </div>
  );
}
