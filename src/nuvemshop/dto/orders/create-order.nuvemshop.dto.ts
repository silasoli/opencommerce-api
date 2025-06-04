// https://tiendanube.github.io/api-documentation/resources/order#shipping-method
export class CreateOrderNuvemShopDto {
  contact_email: string;
  contact_phone?: string;
  currency?: string = 'BRL';
  send_email?: boolean = false;
  customer: {
    name: string;
    email: string;
    phone?: string;
    document?: string;
  };
  products: {
    product_id: number;
    quantity: number;
    variant_id?: number;
    price?: string; // se necessário, dependendo da config da loja
  }[];
  // shipping_option?: {
  //   name?: string;
  //   cost?: string;
  //   delivery_estimate?: string;
  // };
  shipping_pickup_type: 'ship' | 'pickup';
  gateway: 'not-provided';
  inventory_behaviour: 'bypass' | 'claim';
  billing_address: {
    first_name: string;
    last_name: string;
    address: string;
    number: string;
    floor?: string;
    locality?: string;
    city: string;
    province: string;
    country: string;
    zipcode: string;
    phone?: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    address: string;
    number: string;
    floor?: string;
    locality?: string;
    city: string;
    province: string;
    country: string;
    zipcode: string;
    phone?: string;
  };
  shipping: 'table' | 'not-provided';
  shipping_option: string;
  // shipping_tracking_number //vamos usar isso?
  //esse valor deve ser um double que representa o custo do frete
  shipping_cost_customer: number;
  extra?: Record<string, string>; // campos personalizados
  note: string;
}
