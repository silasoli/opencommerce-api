export type PaymentWebook = {
  id: string;
  event: string;
  dateCreated: string;
  payment: Payment;
};

export type Payment = {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  subscription?: string;
  installment?: string;
  paymentLink?: string;
  dueDate: string;
  originalDueDate: string;
  value: number;
  netValue: number;
  originalValue?: number | null;
  interestValue?: number | null;
  nossoNumero?: string | null;
  description: string;
  externalReference: string;
  billingType: string;
  status: string;
  pixTransaction?: unknown | null;
  confirmedDate: string;
  paymentDate: string;
  clientPaymentDate: string;
  installmentNumber?: number | null;
  creditDate: string;
  custody?: string | null;
  estimatedCreditDate: string;
  invoiceUrl: string;
  bankSlipUrl?: string | null;
  transactionReceiptUrl: string;
  invoiceNumber: string;
  deleted: boolean;
  anticipated: boolean;
  anticipable: boolean;
  lastInvoiceViewedDate: string;
  lastBankSlipViewedDate?: string | null;
  postalService: boolean;
  creditCard: CreditCard;
  discount: Discount;
  fine: Fine;
  interest: Interest;
  split: Split[];
  chargeback?: Chargeback | null;
  refunds?: unknown | null;
};

export type CreditCard = {
  creditCardNumber: string;
  creditCardBrand: string;
  creditCardToken: string;
};

export type Discount = {
  value: number;
  dueDateLimitDays: number;
  limitedDate?: string | null;
  type: string;
};

export type Fine = {
  value: number;
  type: string;
};

export type Interest = {
  value: number;
  type: string;
};

export type Split = {
  walletId: string;
  fixedValue?: number;
  percentualValue?: number;
  status: string;
  refusalReason?: string | null;
};

export type Chargeback = {
  status: string;
  reason: string;
};
