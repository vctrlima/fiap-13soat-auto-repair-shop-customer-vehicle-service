import { DeleteVehicle } from '@/domain/use-cases';

export interface DeleteVehicleRepository {
  delete: (params: DeleteVehicleRepository.Params) => Promise<void>;
}
export namespace DeleteVehicleRepository {
  export type Params = DeleteVehicle.Params;
}
