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
  NOT_FOUND_VIA_CEP: new InternalServerErrorException({
    id: 'SRV-003',
    message: 'VIA CEP URL is missing in environment variables.',
  }),
  NOT_FOUND_ASAAS_URL: new InternalServerErrorException({
    id: 'SRV-004',
    message: 'ASAAS URL is missing in environment variables.',
  }),
  NOT_FOUND_ASAAS_AUTH: new InternalServerErrorException({
    id: 'SRV-006',
    message: 'ASAAS AUTH is missing in environment variables.',
  }),
};
