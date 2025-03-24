export class CustomerAddressResponseDto {
  id: number;
  address: string;
  city: string;
  country: string;
  created_at: string;
  default?: boolean;
  floor?: string | null;
  locality?: string | null;
  number: string;
  phone?: string;
  province: string;
  updated_at: string;
  zipcode: string;
}
