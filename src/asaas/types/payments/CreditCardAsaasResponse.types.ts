import { ApiProperty } from '@nestjs/swagger';

export class CreditCardTokenizeAsaasResponse {
  @ApiProperty({ required: true })
  creditCardNumber: string;

  @ApiProperty({ required: true })
  creditCardBrand: string;

  @ApiProperty({ required: true })
  creditCardToken: string;
}
