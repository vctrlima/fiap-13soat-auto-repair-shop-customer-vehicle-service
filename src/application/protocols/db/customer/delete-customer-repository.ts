import { DeleteCustomer } from '@/domain/use-cases';

export interface DeleteCustomerRepository {
  delete: (params: DeleteCustomerRepository.Params) => Promise<void>;
}
export namespace DeleteCustomerRepository {
  export type Params = DeleteCustomer.Params;
}
