import { Customer } from '@/domain/entities';

export interface GetAllCustomers {
  getAll: (params: GetAllCustomers.Params) => Promise<GetAllCustomers.Result>;
}

export namespace GetAllCustomers {
  export type Params = {
    page: number;
    limit: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    name?: string;
    email?: string;
    document?: string;
    phone?: string;
  };
  export type Result = {
    content: Customer[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
