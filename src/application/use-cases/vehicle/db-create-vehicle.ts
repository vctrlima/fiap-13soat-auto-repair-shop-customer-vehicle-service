import { CreateVehicleRepository } from '@/application/protocols/db';
import { CreateVehicle } from '@/domain/use-cases';
import { vehicleCreatedCounter } from '@/infra/observability';

export class DbCreateVehicle implements CreateVehicle {
  constructor(
    private readonly createVehicleRepository: CreateVehicleRepository,
  ) {}

  async create(params: CreateVehicle.Params): Promise<CreateVehicle.Result> {
    const result = await this.createVehicleRepository.create(params);
    vehicleCreatedCounter.add(1);
    return result;
  }
}
