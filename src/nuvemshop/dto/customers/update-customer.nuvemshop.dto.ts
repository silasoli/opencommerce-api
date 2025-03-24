import { CreateCustomerAddressDto } from './create-customer.nuvemshop.dto';

export class UpdateCustomerNuvemShopDto {
  name?: string;
  email?: string;
  phone?: string;
  identification?: string;
  note?: string;
  addresses?: CreateCustomerAddressDto[];

  billing_address?: string;
  billing_number?: string;
  billing_floor?: string;
  billing_locality?: string;
  billing_zipcode?: string;
  billing_city?: string;
  billing_province?: string;
  billing_country?: string;
  billing_phone?: string;

  extra?: Record<string, any>;
}
