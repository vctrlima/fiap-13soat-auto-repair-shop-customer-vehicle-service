export interface DeleteCustomer {
  delete: (params: DeleteCustomer.Params) => Promise<void>;
}

export namespace DeleteCustomer {
  export type Params = { document: string };
}
