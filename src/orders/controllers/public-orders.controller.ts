import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShipmentCalculateMelhorEnvioResponseDto } from '../../melhor-envio/dto/shipment-calculate-response.dto';
import { EstimateShippingDto } from '../dto/estimate-shipping.dto';

@ApiTags('Orders - Public')
@Controller('orders')
export class PublicOrdersController {
  constructor(private readonly service: OrdersService) {}
  //testar request sem ta logado
  @ApiOperation({ summary: 'Estimar frete de um pedido' })
  @ApiResponse({
    status: 201,
    description: 'Estimar frete de um pedido',
    type: ShipmentCalculateMelhorEnvioResponseDto,
  })
  @ApiBody({ type: EstimateShippingDto })
  // @ApiResponse({
  //   status: SHIPPING_ERRORS.PRODUCTS_NOT_FOUND.getStatus(),
  //   description: SHIPPING_ERRORS.PRODUCTS_NOT_FOUND.message,
  // })
  @Post('/estimate/shipping')
  async estimateShipping(
    @Body() dto: EstimateShippingDto,
  ): Promise<ShipmentCalculateMelhorEnvioResponseDto[]> {
    return this.service.estimateShipping(dto);
  }
}
