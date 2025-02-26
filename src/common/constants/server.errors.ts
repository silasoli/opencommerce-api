import { InternalServerErrorException } from '@nestjs/common';

export const SERVER_ERRORS = {
  NOT_FOUND_PORT: new InternalServerErrorException({
    id: 'SRV-001',
    message: 'Application port wasnt found',
  }),
  NOT_FOUND_MAILGUN: new InternalServerErrorException({
    id: 'SRV-002',
    message:
      'Mailgun API Key or MAILGUN_DOMAIN is missing in environment variables.',
  }),
};
