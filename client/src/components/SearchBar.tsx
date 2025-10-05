import React from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-4 w-full">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search items..."}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   text-gray-800 placeholder-gray-400 transition"
      />
    </div>
  );
};
