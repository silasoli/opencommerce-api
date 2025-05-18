import { Injectable } from '@nestjs/common';
import { CalculateInstallmentsDto } from '../dto/installments/calculate-installments.dto';
import { OrdersService } from './orders.service';
import { CalculateAllInstallmentsResponseDto } from '../dto/installments/calculate-all-installments-response.dto';
import { CalculateInstallments } from '../types/installments.types';
import { ProductItemDto } from '../dto/create-order.dto';

@Injectable()
export class InstallmentsService {
  constructor(private readonly ordersService: OrdersService) {}

  public async processOrder(
    products: ProductItemDto[],
    requestedInstallments: number[],
  ): Promise<CalculateInstallments[]> {
    const foundProducts =
      await this.ordersService.findVariantsByOrder(products);

    const totalValue = this.ordersService.calculateTotalOrderValue(
      products,
      foundProducts,
    );

    const installmentOptions = this.ordersService.calculateInstallments(
      totalValue,
      requestedInstallments,
    );

    return installmentOptions;
  }

  public async calculateAllInstallments(
    dto: CalculateInstallmentsDto,
  ): Promise<CalculateAllInstallmentsResponseDto[]> {
    const installmentOptions = await this.processOrder(
      dto.products,
      [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    );

    return installmentOptions.map(
      (item) => new CalculateAllInstallmentsResponseDto(item),
    );
  }
}
