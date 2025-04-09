export class CreateCustomerNuvemShopDto {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  send_email_invite?: boolean;
  addresses?: CreateCustomerAddressDto[];
}

export class CreateCustomerAddressDto {
  address: string;
  city: string;
  country: string;
  locality?: string;
  number: string;
  phone?: string;
  province: string;
  zipcode: string;
}
