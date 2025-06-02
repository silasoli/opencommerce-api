import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BillingType } from '../../asaas/dto/payments/create-charge-asaas.dto';
import { PaymentStatus } from '../../database/entities/order.entity';
import { OrderResponseNuvemShopDto } from '../../nuvemshop/dto/orders/order-response.nuvemshop.dto';
import { ShipmentCalculateMelhorEnvioResponse } from '../../melhor-envio/types/shipment-calculate.types';
import { PaymentDetailsResponse } from '../../asaas/types/asaas/orders.types';

class CreateChargeAsaasResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customer: string;

  @ApiProperty()
  dateCreated: string;

  @ApiProperty()
  dueDate: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  netValue: number;

  @ApiProperty()
  billingType: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  pixTransaction: string;

  @ApiProperty()
  pixQrCodeId: string;

  @ApiProperty()
  originalValue: number;

  @ApiProperty()
  paymentDate: string;

  @ApiProperty()
  invoiceUrl: string;

  @ApiProperty()
  bankSlipUrl: string;
}

class PackageDimensions {
  @ApiProperty() height: number;
  @ApiProperty() width: number;
  @ApiProperty() length: number;
}

class PackageProduct {
  @ApiProperty() id: string;
  @ApiProperty() quantity: number;
}

class Package {
  @ApiProperty() price: string;
  @ApiProperty() discount: string;
  @ApiProperty() format: string;
  @ApiProperty({ type: PackageDimensions }) dimensions: PackageDimensions;
  @ApiProperty() weight: string;
  @ApiProperty() insurance_value: string;
  @ApiProperty({ type: [PackageProduct] }) products: PackageProduct[];
}

class DeliveryRange {
  @ApiProperty() min: number;
  @ApiProperty() max: number;
}

class AdditionalServices {
  @ApiProperty() receipt: boolean;
  @ApiProperty() own_hand: boolean;
  @ApiProperty() collect: boolean;
}

class ShippingCompany {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() picture: string;
}

class ShipmentCalculateMelhorEnvioResponseDto {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty({ required: false }) error?: string;
  @ApiProperty() price: string;
  @ApiProperty() custom_price: string;
  @ApiProperty() discount: string;
  @ApiProperty() currency: string;
  @ApiProperty() delivery_time: number;
  @ApiProperty({ type: DeliveryRange }) delivery_range: DeliveryRange;
  @ApiProperty() custom_delivery_time: number;
  @ApiProperty({ type: DeliveryRange }) custom_delivery_range: DeliveryRange;
  @ApiProperty({ type: [Package] }) packages: Package[];
  @ApiProperty({ type: AdditionalServices })
  additional_services: AdditionalServices;
  @ApiProperty({ type: ShippingCompany }) company: ShippingCompany;
}
class PixQrCodeAsaasResponse {
  @ApiProperty() success: boolean;
  @ApiProperty() encodedImage: string;
  @ApiProperty() payload: string;
  @ApiProperty() expirationDate: string;
}

class DigitableBillAsaasResponse {
  @ApiProperty() digitableLine: string;
  @ApiProperty() bankSlipUrl: string;
}

class PaymentDetailsResponseDto {
  @ApiPropertyOptional({ type: PixQrCodeAsaasResponse })
  PIX?: PixQrCodeAsaasResponse;

  @ApiPropertyOptional({ type: DigitableBillAsaasResponse })
  BOLETO?: DigitableBillAsaasResponse;
}

export class CreateOrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  asaas_order_id: string;

  @ApiProperty()
  nuvemshop_order_id: number;

  @ApiProperty({ enum: BillingType })
  billingType: BillingType;

  @ApiProperty({ enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @ApiProperty()
  user_id: string;

  @ApiProperty({ type: OrderResponseNuvemShopDto })
  orderData: OrderResponseNuvemShopDto;

  @ApiProperty({ type: CreateChargeAsaasResponseDto })
  paymentData: CreateChargeAsaasResponseDto;

  @ApiProperty({ type: ShipmentCalculateMelhorEnvioResponseDto })
  @ApiProperty()
  shippingData: ShipmentCalculateMelhorEnvioResponse;

  @ApiPropertyOptional({ type: PaymentDetailsResponseDto })
  paymentDetails?: PaymentDetailsResponse | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  canceledAt?: Date;

  @ApiPropertyOptional()
  deletedAt?: Date | null;
}
