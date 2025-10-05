import { z } from 'zod';

export const createItemSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price must be non-negative'),
    quantity: z.number().int().min(0, 'Quantity must be non-negative'),
    tags: z.array(z.string()).optional(),
    status: z.enum(['active', 'inactive']).default('active'),
  })
  .strict();

export const updateItemSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.number().min(0).optional(),
    quantity: z.number().int().min(0).optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['active', 'inactive']).optional(),
  })
  .strict();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
