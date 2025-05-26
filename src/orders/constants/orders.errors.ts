import {
  BadGatewayException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

export const ORDERS_ERRORS = {
  SHIPPING_NOT_FOUND: new BadRequestException({
    id: 'ORD-001',
    message: 'Frete não encontrado',
  }),
  VARIANT_NOT_FOUND: new NotFoundException({
    id: 'ORD-002',
    message: 'Variante não encontrada',
  }),
  FAILED_CREATE_ASAAS_ORDER: new BadGatewayException({
    id: 'ORD-003',
    message: 'Falha para criar pedido na adquirente',
  }),
  NOT_FOUND: new NotFoundException({
    id: 'ORD-004',
    message: 'Pedido nao encontrado',
  }),
};
