import { BillingType } from '../../dto/payments/create-charge-asaas.dto';

export enum PaymentStatus {
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  CONFIRMED = 'CONFIRMED',
  SENT = 'SENT', //status interno
  OVERDUE = 'OVERDUE',
  REFUNDED = 'REFUNDED',
  RECEIVED_IN_CASH = 'RECEIVED_IN_CASH',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  REFUND_IN_PROGRESS = 'REFUND_IN_PROGRESS',
  CHARGEBACK_REQUESTED = 'CHARGEBACK_REQUESTED',
  CHARGEBACK_DISPUTE = 'CHARGEBACK_DISPUTE',
  AWAITING_CHARGEBACK_REVERSAL = 'AWAITING_CHARGEBACK_REVERSAL',
  DUNNING_REQUESTED = 'DUNNING_REQUESTED',
  DUNNING_RECEIVED = 'DUNNING_RECEIVED',
  AWAITING_RISK_ANALYSIS = 'AWAITING_RISK_ANALYSIS',
}

export type CreateChargeAsaasResponse = {
  id: string;
  customer: string;
  dateCreated: string;
  dueDate: string;
  value: number;
  netValue: number; //Valor líquido da cobrança após desconto da tarifa do Asaas
  billingType: BillingType;
  status: PaymentStatus;
  pixTransaction: string; //ID
  pixQrCodeId: string; //ID QR CODE
  originalValue: number; //Valor original da cobrança (preenchido quando paga com juros e multa)
  paymentDate: string;
  invoiceUrl: string; //URL da fatura
  bankSlipUrl: string; //URL para download do boleto
};
