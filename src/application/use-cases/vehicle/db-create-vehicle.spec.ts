import { DbCreateVehicle } from '@/application/use-cases/vehicle/db-create-vehicle';
import { CreateVehicleRepository } from '@/application/protocols/db';

jest.mock('@/infra/observability', () => ({
  vehicleCreatedCounter: { add: jest.fn() },
}));

const makeRepository = (): CreateVehicleRepository => ({
  create: jest.fn(),
});

const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbCreateVehicle(repository);
  return { sut, repository };
};

describe('DbCreateVehicle', () => {
  const params = { customerId: 'cust-1', licensePlate: 'ABC1234', brand: 'Toyota', model: 'Corolla', year: 2023 };
  const mockResult = { id: 'v-1', ...params, createdAt: new Date(), updatedAt: null };

  it('should call repository with correct params', async () => {
    const { sut, repository } = makeSut();
    (repository.create as jest.Mock).mockResolvedValue(mockResult);
    await sut.create(params);
    expect(repository.create).toHaveBeenCalledWith(params);
  });

  it('should return created vehicle', async () => {
    const { sut, repository } = makeSut();
    (repository.create as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.create(params);
    expect(result).toEqual(mockResult);
  });

  it('should increment counter on success', async () => {
    const { sut, repository } = makeSut();
    const { vehicleCreatedCounter } = require('@/infra/observability');
    (repository.create as jest.Mock).mockResolvedValue(mockResult);
    await sut.create(params);
    expect(vehicleCreatedCounter.add).toHaveBeenCalledWith(1);
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.create as jest.Mock).mockRejectedValue(new Error('duplicate'));
    await expect(sut.create(params)).rejects.toThrow('duplicate');
  });
});
