import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../database/entities/order.entity';

export class CheckStatusResponseDto {
  constructor(data: { status: PaymentStatus }) {
    Object.assign(this, data);
  }

  @ApiProperty({ required: true })
  status: PaymentStatus;
}