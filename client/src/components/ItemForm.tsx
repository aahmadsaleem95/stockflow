import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Item } from "../types/item";
import { ItemFormValues, itemFormSchema } from "../schemas/itemFormSchema";

interface Props {
  initialValues?: Partial<Item>;
  onSubmit: (values: ItemFormValues) => Promise<void>;
  submitLabel?: string;
}

export const ItemForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
      tags: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (initialValues) {
      setValue("title", initialValues.title ?? "");
      setValue("description", initialValues.description ?? "");
      setValue("category", initialValues.category ?? "");
      setValue(
        "price",
        typeof initialValues.price === "number" ? initialValues.price : 0
      );
      setValue(
        "quantity",
        typeof initialValues.quantity === "number" ? initialValues.quantity : 0
      );
      setValue("tags", (initialValues.tags || []).join(", "));
      setValue("status", initialValues.status ?? "active");
    }
  }, [initialValues, setValue]);

  const submit: SubmitHandler<ItemFormValues> = async (
    values: ItemFormValues
  ) => {
    const payload = {
      ...values,
      tags: values.tags
        ? values.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };
    await onSubmit(payload as any);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 text-gray-800">
      <div>
        <label className="block font-medium">Title</label>
        <input
          {...register("title")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <input
          {...register("category")}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Tags</label>
        <input
          {...register("tags")}
          placeholder="Comma separated"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {isSubmitting
          ? submitLabel === "Save"
            ? "Saving..."
            : "Updating"
          : submitLabel === "Save"
          ? "Save"
          : "Update"}
      </button>
    </form>
  );
};
