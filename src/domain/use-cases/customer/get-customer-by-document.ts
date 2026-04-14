import { Customer } from '@/domain/entities';

export interface GetCustomerByDocument {
  getByDocument: (params: GetCustomerByDocument.Params) => Promise<GetCustomerByDocument.Result>;
}

export namespace GetCustomerByDocument {
  export type Params = { document: string };
  export type Result = Customer;
}
