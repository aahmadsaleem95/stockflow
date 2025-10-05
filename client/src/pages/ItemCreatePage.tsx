import React from "react";
import { ItemForm } from "../components/ItemForm";
import { createItem } from "../api/itemsApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ItemCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const submit = async (values: any) => {
    try {
      await createItem(values);
      toast.success("Item created");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Create Item
        </h2>
        <ItemForm onSubmit={submit} />
      </div>
    </div>
  );
};
