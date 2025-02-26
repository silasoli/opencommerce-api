import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const MAILER_ERRORS = {
  EMAIL_SEND_FAILED: new InternalServerErrorException({
    id: 'MLR-001',
    message: 'Falha ao enviar o e-mail.',
  }),
  NOT_FOUND_TEMPLATE: new BadRequestException({
    id: 'MLR-002',
    message: 'Template de e-mail não encontrado.',
  }),
};
