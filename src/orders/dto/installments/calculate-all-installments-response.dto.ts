import { ApiProperty } from '@nestjs/swagger';
import { CalculateInstallments } from '../../types/installments.types';

export class CalculateAllInstallmentsResponseDto {
  constructor(data: CalculateInstallments) {
    Object.assign(this, data);
  }

  @ApiProperty({ required: true })
  installments: number;

  @ApiProperty({ required: true })
  installmentValue: number;

  @ApiProperty({ required: true })
  amount: number;
}
