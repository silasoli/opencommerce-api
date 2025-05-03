import { BadRequestException } from '@nestjs/common';

export const ORDERS_ERRORS = {
  SHIPPING_NOT_FOUND: new BadRequestException({
    id: 'ORD-001',
    message: 'Frete não encontrado',
  }),
};
