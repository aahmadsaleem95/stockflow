import { z } from "zod";

export const itemFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  price: z
    .number({ error: "Price must be a number" })
    .min(0, "Price must be non-negative"),
  quantity: z
    .number({ error: "Quantity must be a number" })
    .int()
    .min(0, "Quantity must be non-negative"),
  description: z.string().optional(),
  tags: z.string().optional(),
  status: z.custom<"active" | "inactive">(),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;
