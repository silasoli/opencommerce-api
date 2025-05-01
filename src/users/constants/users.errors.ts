import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';

export const USERS_ERRORS = {
  NOT_FOUND: new NotFoundException({
    id: 'USR-001',
    message: 'Usuário não encontrado.',
  }),
  CREATE_ERROR: new ServiceUnavailableException({
    id: 'USR-002',
    message: 'Erro ao criar usuário.',
  }),
};
