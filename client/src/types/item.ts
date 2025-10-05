export type ItemStatus = "active" | "inactive";

export interface Item {
  id: number;
  title: string;
  description?: string | null;
  category: string;
  price: number;
  quantity: number;
  tags?: string[] | null;
  status: ItemStatus;
  created_at?: string;
  updated_at?: string;
}
