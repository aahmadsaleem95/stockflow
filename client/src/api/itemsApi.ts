import { apiClient } from "../utils/apiClient";
import { Item } from "../types/item";

export type GetItemsResponse = { data: Item[]; total: number };

export const getItems = async (params: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10, search } = params;
  const res = await apiClient.get("/items", {
    params: { page, limit, search },
  });
  // backend returns { data, total }
  return res.data as GetItemsResponse;
};

export const getItem = async (id: number) => {
  const res = await apiClient.get(`/items/${id}`);
  return res.data as Item;
};

export const createItem = async (payload: Partial<Item>) => {
  const res = await apiClient.post("/items", payload);
  return res.data as Item;
};

export const updateItem = async (id: number, payload: Partial<Item>) => {
  const res = await apiClient.patch(`/items/${id}`, payload);
  return res.data as Item;
};

export const deleteItem = async (id: number) => {
  const res = await apiClient.delete(`/items/${id}`);
  return res.data;
};
