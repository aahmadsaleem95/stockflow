import React, { useEffect, useState, useCallback } from "react";
import { getItems, deleteItem } from "../api/itemsApi";
import { ItemList } from "../components/ItemList";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { useDebounce } from "../hooks/useDebouce";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Item } from "../types/item";

export const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getItems({
        page,
        limit: pageSize,
        search: debouncedSearch || undefined,
      });
      setItems(res.data);
      setTotal(res.total);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      toast.success("Item deleted");
      fetch();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Items</h2>
        <button
          onClick={() => navigate("/items/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          + Create
        </button>
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by title, description, or category..."
      />

      {/* Item List */}
      <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <ItemList items={items} loading={loading} onDelete={handleDelete} />
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={(p) => setPage(Math.max(1, p))}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
};
