import React from "react";
import { Item } from "../types/item";
import { Link } from "react-router-dom";

interface Props {
  items: Item[];
  loading: boolean;
  onDelete: (id: number, name: string) => void;
}

export const ItemList: React.FC<Props> = ({ items, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-500 text-sm">
        Loading items...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-500 text-sm">
        No items found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mt-4">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Quantity</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {items.map((it) => (
            <tr
              key={it.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-3 font-medium text-gray-800">
                {it.title}
              </td>
              <td className="px-6 py-3 text-gray-600">{it.category}</td>
              <td className="px-6 py-3 text-gray-600">${it.price}</td>
              <td className="px-6 py-3 text-gray-600">{it.quantity}</td>
              <td>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    it.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {it.status}
                </span>
              </td>
              <td className="px-6 py-3">
                <div className="flex gap-2">
                  <Link to={`/items/${it.id}/edit`}>
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(it.id, it.title)}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
