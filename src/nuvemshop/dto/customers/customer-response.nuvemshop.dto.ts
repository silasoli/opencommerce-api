import { CustomerAddressResponseDto } from './customer-address-response.dto';

export class CustomerResponseNuvemShopDto {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  identification?: string;
  note?: string | null;
  total_spent: string;
  total_spent_currency: string;
  last_order_id?: number | null;
  active?: boolean;
  created_at: string;
  updated_at: string;

  billing_address?: string | null;
  billing_number?: string | null;
  billing_floor?: string | null;
  billing_locality?: string | null;
  billing_zipcode?: string | null;
  billing_city?: string | null;
  billing_province?: string | null;
  billing_country?: string | null;
  billing_phone?: string | null;

  extra?: Record<string, any>;

  default_address?: CustomerAddressResponseDto;
  addresses?: CustomerAddressResponseDto[];
}
