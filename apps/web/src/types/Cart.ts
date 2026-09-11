export type Cart = {
  id: string;
  version: number;
  items: CartItem[];
  quantity: number;
  subtotal: number;
  currency: string;
};

export type CartItem = {
  productId: string;
  title: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};