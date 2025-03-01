export type ChargeAsaasResponse = {
  id: string;
  name: string;
  email: string;
  mobilePhone?: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  personType: string;
  cityName?: string;
  state?: string;
  country: string;
};

export type DigitableBillAsaasResponse = {
  identificationField: string;
  nossoNumero: string;
  barCode: string;
};

export type PixQrCodeAsaasResponse = {
  encodedImage: string;
  payload: string;
  expirationDate: string;
};
