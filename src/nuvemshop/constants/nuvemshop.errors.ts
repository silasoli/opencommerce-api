import { InternalServerErrorException } from '@nestjs/common';

export const NUVEMSHOP_ERRORS = {
  UNKNOWN_ERROR: new InternalServerErrorException({
    id: 'ASS-001',
    message: 'Error desconhecido.',
  }),
};
