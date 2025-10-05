import React from "react";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
}

export const Pagination: React.FC<Props> = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm">
      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={`px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          First
        </button>

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span className="px-2 text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Last
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center gap-3 text-gray-700">
        <label className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Page size:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 10, 20, 50].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <div className="text-gray-600 font-medium">Total: {total}</div>
      </div>
    </div>
  );
};
