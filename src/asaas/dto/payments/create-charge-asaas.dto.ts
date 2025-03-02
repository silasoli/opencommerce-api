import { ApiProperty } from '@nestjs/swagger';

export enum BillingType {
  BOLETO = 'BOLETO',
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX',
}

export class CreateChargeAsaasDto {
  @ApiProperty({ required: true })
  customer: string;

  @ApiProperty({ required: true })
  billingType: BillingType;

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
}
