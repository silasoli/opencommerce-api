import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { Controller, Post } from '@nestjs/common';
// import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
// import { MelhorEnvioService } from '../services/melhor-envio.service';
// import { ShipmentCalculateMelhorEnvioResponseDto } from '../dto/shipment-calculate-response.dto';

@ApiTags('Melhor Envio')
@Controller('melhor-envio')
export class MelhorEnvioController {
  // constructor(private readonly melhorEnvioService: MelhorEnvioService) {}
  // @Post('test/estimate')
  // @ApiCreatedResponse({
  //   type: [ShipmentCalculateMelhorEnvioResponseDto],
  // })
  // // @ApiResponse({
  // //   status: SHIPPING_ERRORS.PRODUCTS_NOT_FOUND.getStatus(),
  // //   description: SHIPPING_ERRORS.PRODUCTS_NOT_FOUND.message,
  // // })
  // create(): Promise<ShipmentCalculateMelhorEnvioResponseDto[]> {
  //   return this.melhorEnvioService.calculateShipment({
  //     postal_code: '12903-834',
  //     products: [
  //       {
  //         id: 'x',
  //         width: 11,
  //         height: 17,
  //         length: 11,
  //         weight: 0.3,
  //         insurance_value: 10.1,
  //         quantity: 1,
  //       },
  //     ],
  //   });
  // }
  // constructor(private readonly shippingService: ShippingService) {}
  // @Post('estimate')
  // @ApiCreatedResponse({
  //   type: [ShipmentCalculateResponseDto],
  // })
  // @ApiResponse({
  //   status: SHIPPING_ERRORS.PRODUCTS_NOT_FOUND.getStatus(),
  //   description: SHIPPING_ERRORS.PRODUCTS_NOT_FOUND.message,
  // })
  // create(@Body() dto: MakeBudgetDto): Promise<ShipmentCalculateResponseDto[]> {
  //   return this.shippingService.seekDeliveryQuote(dto);
  // }
}
