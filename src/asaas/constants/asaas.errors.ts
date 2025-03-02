import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const ASAAS_ERRORS = {
  UNKNOWN_ERROR: new InternalServerErrorException({
    id: 'ASS-001',
    message: 'Error desconhecido.',
  }),
  NOT_FOUND_CUSTOMER: new BadRequestException({
    id: 'ASS-002',
    message: 'Customer not found.',
  }),
};
