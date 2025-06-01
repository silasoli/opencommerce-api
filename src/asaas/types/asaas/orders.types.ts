import {
  DigitableBillAsaasResponse,
  PixQrCodeAsaasResponse,
} from '../payments/ChargeAsaasResponse.types';

export type ProductsFormattedToSave = {
  id: string;
  name: string;
  main_image_url: string;
  price: number;
  discount_price?: number;
  quantity: number;
};

export type PaymentDetailsResponse = {
  PIX?: PixQrCodeAsaasResponse;
  BOLETO?: DigitableBillAsaasResponse;
};
