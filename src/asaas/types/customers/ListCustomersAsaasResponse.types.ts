import { CustomersAsaasResponse } from './CustomersAsaasResponse.types';

export type ListCustomersAsaasResponse = {
  object: string;
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: CustomersAsaasResponse[];
};
