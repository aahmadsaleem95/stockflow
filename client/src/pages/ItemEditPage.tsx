import React, { useEffect, useState } from "react";
import { ItemForm } from "../components/ItemForm";
import { getItem, updateItem } from "../api/itemsApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Item } from "../types/item";

export const ItemEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Partial<Item> | undefined>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getItem(Number(id));
        setInitial(data);
      } catch (err: any) {
        toast.error("Failed to load item");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const submit = async (values: any) => {
    try {
      await updateItem(Number(id), values);
      toast.success("Item updated");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!initial) return <div>Item not found</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Edit Item
        </h2>
        <ItemForm
          initialValues={initial}
          onSubmit={submit}
          submitLabel="Update"
        />
      </div>
    </div>
  );
};
