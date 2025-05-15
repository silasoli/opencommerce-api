import { BadRequestException, NotFoundException } from '@nestjs/common';

export const ORDERS_ERRORS = {
  SHIPPING_NOT_FOUND: new BadRequestException({
    id: 'ORD-001',
    message: 'Frete não encontrado',
  }),
  VARIANT_NOT_FOUND: new NotFoundException({
    id: 'ORD-002',
    message: 'Variante não encontrada',
  }),
};
