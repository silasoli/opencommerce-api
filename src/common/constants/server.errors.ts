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
  NOT_FOUND_NUVEMSHOP_AUTH: new InternalServerErrorException({
    id: 'SRV-007',
    message: 'NUVEMSHOP AUTH is missing in environment variables.',
  }),
  NOT_FOUND_NUVEMSHOP_URL: new InternalServerErrorException({
    id: 'SRV-008',
    message: 'NUVEMSHOP URL is missing in environment variables.',
  }),
  NOT_FOUND_NUVEMSHOP_CLIENT_ID: new InternalServerErrorException({
    id: 'SRV-009',
    message: 'NUVEMSHOP CLIENT ID is missing in environment variables.',
  }),
  NOT_FOUND_NUVEMSHOP_USER_AGENT: new InternalServerErrorException({
    id: 'SRV-010',
    message: 'NUVEMSHOP USER AGENT is missing in environment variables.',
  }),
};
