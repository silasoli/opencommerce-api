export class CreateOrderNuvemShopDto {
  contact_email: string;
  contact_phone?: string;
  currency?: string = 'BRL';
  send_email?: boolean = false;
  customer?: {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
  };
  products: {
    product_id: number;
    quantity: number;
    variant_id?: number;
    price?: string; // se necessário, dependendo da config da loja
  }[];
  shipping_option?: {
    name?: string;
    cost?: string;
    delivery_estimate?: string;
  };
  shipping_address?: {
    address: string;
    number: string;
    city: string;
    province: string;
    country: string;
    zipcode: string;
    phone?: string;
    floor?: string;
    locality?: string;
  };
  extra?: Record<string, string>; // campos personalizados
}
