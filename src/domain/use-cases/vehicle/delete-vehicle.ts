export interface DeleteVehicle {
  delete: (params: DeleteVehicle.Params) => Promise<void>;
}

export namespace DeleteVehicle {
  export type Params = { id: string };
}
