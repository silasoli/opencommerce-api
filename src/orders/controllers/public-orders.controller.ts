import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ShipmentCalculateMelhorEnvioResponseDto } from '../../melhor-envio/dto/shipment-calculate-response.dto';
import { EstimateShippingDto } from '../dto/estimate-shipping.dto';
import { ORDERS_ERRORS } from '../constants/orders.errors';
import { CalculateAllInstallmentsResponseDto } from '../dto/installments/calculate-all-installments-response.dto';
import { CalculateInstallmentsDto } from '../dto/installments/calculate-installments.dto';
import { InstallmentsService } from '../services/installments.service';

@ApiTags('Orders - Public')
@Controller('orders')
export class PublicOrdersController {
  constructor(
    private readonly service: OrdersService,
    private readonly installmentsService: InstallmentsService,
  ) {}
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

  @Post('/estimate/installments')
  @ApiCreatedResponse({
    type: [CalculateAllInstallmentsResponseDto],
  })
  @ApiResponse({
    status: ORDERS_ERRORS.VARIANT_NOT_FOUND.getStatus(),
    description: ORDERS_ERRORS.VARIANT_NOT_FOUND.message,
  })
  public calculateInstallments(
    @Body() dto: CalculateInstallmentsDto,
  ): Promise<CalculateAllInstallmentsResponseDto[]> {
    return this.installmentsService.calculateAllInstallments(dto);
  }
}
