import { CreditCardHolderInfoAsaasDto } from '../orders/holder-info-asaas.dto';
import { BillingType } from './create-charge-asaas.dto';
import { CreateChargeCardAsaasDto } from './credit-card-asaas.dto';

export type CreateChargeCardWithTokenDto = CreateChargeCardAsaasDto & {
  creditCardToken: string;
  authorizeOnly: boolean;
  billingType: BillingType.CREDIT_CARD;
  creditCardHolderInfo: CreditCardHolderInfoAsaasDto;
};
