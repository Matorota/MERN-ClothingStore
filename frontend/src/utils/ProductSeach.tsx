import React, { useState } from "react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  value: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  onSearch,
  onClear,
  value,
}) => {
  const [input, setInput] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
  };

  const handleClear = () => {
    setInput("");
    onClear();
  };

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-2">
      <input
        type="text"
        placeholder="Search by title..."
        value={input}
        onChange={handleInputChange}
        className="w-full rounded-md border border-slate-300 px-2 py-1"
      />
      <button
        onClick={handleSearch}
        className="w-full rounded-md bg-blue-300 px-2 py-1 text-base font-medium text-white"
        style={{ minHeight: "40px" }}
      >
        Search
      </button>
      <span
        onClick={handleClear}
        className="mt-1 cursor-pointer text-xs text-gray-500 underline hover:text-gray-700"
        style={{ fontSize: "0.75rem", width: "100%", textAlign: "center" }}
      >
        Clear
      </span>
    </div>
  );
};

export default ProductSearch;
