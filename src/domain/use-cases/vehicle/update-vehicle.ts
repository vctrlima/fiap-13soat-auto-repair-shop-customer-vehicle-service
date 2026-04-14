import { Vehicle } from '@/domain/entities';

export interface UpdateVehicle {
  update: (params: UpdateVehicle.Params) => Promise<UpdateVehicle.Result>;
}

export namespace UpdateVehicle {
  export type Params = {
    id: string;
    licensePlate?: string;
    brand?: string;
    model?: string;
    year?: number;
  };
  export type Result = Vehicle;
}
