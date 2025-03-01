import { ApiProperty } from '@nestjs/swagger';

export class CreditCardTokenizeAsaasDto {
  @ApiProperty({ required: true })
  customer: string;

  @ApiProperty({ required: true })
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };

  @ApiProperty({ required: true })
  creditCardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement?: string;
    phone: string;
    mobilePhone?: string;
  }

  @ApiProperty({ required: true })
  remoteIp: string;
}


export class CreateChargeCardAsaasDto {
  @ApiProperty({ required: true })
  customer: string;

  // @ApiProperty({ required: true })
  // billingType: BillingType;

  @ApiProperty({ required: true })
  value: number; //float

  @ApiProperty({ required: true })
  dueDate: Date;

  @ApiProperty({ required: true })
  installmentCount?: number; //apenas para cartão

  @ApiProperty({ required: true })
  totalValue?: number; //float; Informe o valor total de uma cobrança que será parcelada (somente no caso de cobrança parcelada). Caso enviado este campo o installmentValue não é necessário, o cálculo por parcela será automático

  @ApiProperty({ required: true })
  installmentValue?: number; //float; Valor de cada parcela (somente no caso de cobrança parcelada). Envie este campo em caso de querer definir o valor de cada parcela.

  @ApiProperty({ required: true })
  discount?: { value: number };

  // @ApiProperty({ required: true })
  // creditCardToken: string;

  // @ApiProperty({ required: true })
  // authorizeOnly: string

  @ApiProperty({ required: true })
  remoteIp: string
}