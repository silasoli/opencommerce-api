import { InternalServerErrorException } from '@nestjs/common';

export const MELHOR_ENVIO_ERRORS = {
  UNKNOWN_ERROR: new InternalServerErrorException({
    id: 'MRV-001',
    message: 'Error desconhecido.',
  }),
};
