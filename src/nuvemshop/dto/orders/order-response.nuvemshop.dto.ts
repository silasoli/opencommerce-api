export class OrderResponseNuvemShopDto {
  id: number;
  number: number;
  contact_email: string;
  contact_phone?: string;
  total: string;
  currency: string;
  payment_status: string;
  shipping_status: string;
  created_at: string;
  updated_at: string;
  products: {
    id: number;
    product_id: number;
    name: string;
    quantity: number;
    price: string;
    variant_id?: number;
  }[];
  customer?: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  };
}
