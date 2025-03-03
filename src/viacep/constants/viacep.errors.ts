import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const VIACEP_ERRORS = {
  UNKNOWN_ERROR: new InternalServerErrorException({
    id: 'VCP-001',
    message: 'Error desconhecido.',
  }),
  NOT_FOUND: new NotFoundException({
    id: 'VCP-002',
    message: 'CEP não encontrado.',
  }),
  INVALID_PARAM: new BadRequestException({
    id: 'VCP-003',
    message: 'CEP inválido.',
  }),
};
