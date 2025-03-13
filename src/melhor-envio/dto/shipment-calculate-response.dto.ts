import { ApiProperty } from '@nestjs/swagger';
import { ShipmentCalculateMelhorEnvioResponse } from '../types/shipment-calculate.types';
// import { ProductDto } from '../../orders/dto/order/product.dto';

class DeliveryRangeDto {
  @ApiProperty({ required: true })
  min: number;

  @ApiProperty({ required: true })
  max: number;
}

class PackageDimensionsDto {
  @ApiProperty({ required: true })
  height: number;

  @ApiProperty({ required: true })
  width: number;

  @ApiProperty({ required: true })
  length: number;
}

class PackageDto {
  @ApiProperty({ required: true })
  price: string;

  @ApiProperty({ required: true })
  discount: string;

  @ApiProperty({ required: true })
  format: string;

  @ApiProperty({ required: true, type: () => PackageDimensionsDto })
  dimensions: PackageDimensionsDto;

  @ApiProperty({ required: true })
  weight: string;

  @ApiProperty({ required: true })
  insurance_value: string;

  // @ApiProperty({ required: true, type: () => [ProductDto] })
  @ApiProperty({ required: true })
  products: {
    id: string;
    quantity: number;
  }[];
}

class AdditionalServicesDto {
  @ApiProperty({ required: true })
  receipt: boolean;

  @ApiProperty({ required: true })
  own_hand: boolean;

  @ApiProperty({ required: true })
  collect: boolean;
}

class CompanyDto {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  picture: string;
}

export class ShipmentCalculateMelhorEnvioResponseDto {
  constructor(data: ShipmentCalculateMelhorEnvioResponse) {
    Object.assign(this, data);
  }

  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  price: string;

  @ApiProperty({ required: true })
  custom_price: string;

  @ApiProperty({ required: true })
  discount: string;

  @ApiProperty({ required: true })
  currency: string;

  @ApiProperty({ required: true })
  delivery_time: number;

  @ApiProperty({ required: true, type: () => DeliveryRangeDto })
  delivery_range: DeliveryRangeDto;

  @ApiProperty({ required: true })
  custom_delivery_time: number;

  @ApiProperty({ required: true, type: () => DeliveryRangeDto })
  custom_delivery_range: DeliveryRangeDto;

  @ApiProperty({ required: true, type: () => PackageDto })
  packages: PackageDto;

  @ApiProperty({ required: true, type: () => AdditionalServicesDto })
  additional_services: AdditionalServicesDto;

  @ApiProperty({ required: true, type: () => CompanyDto })
  company: CompanyDto;
}
