import { ProductsToSendType } from '../../types/shipping.types';

export class ShipmentCalculateMelhorEnvioDto {
  postal_code: string;
  products: ProductsToSendType[];
}
