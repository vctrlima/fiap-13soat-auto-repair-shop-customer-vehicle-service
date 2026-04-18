import { DbGetVehicleById } from '@/application/use-cases/vehicle/db-get-vehicle-by-id';
import { GetVehicleByIdRepository } from '@/application/protocols/db';

const makeRepository = (): GetVehicleByIdRepository => ({ getById: jest.fn() });
const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbGetVehicleById(repository);
  return { sut, repository };
};

describe('DbGetVehicleById', () => {
  const mockVehicle = { id: 'v-1', customerId: 'c-1', licensePlate: 'ABC1234', brand: 'Toyota', model: 'Corolla', year: 2023, createdAt: new Date(), updatedAt: null };

  it('should call repository with correct id', async () => {
    const { sut, repository } = makeSut();
    (repository.getById as jest.Mock).mockResolvedValue(mockVehicle);
    await sut.getById({ id: 'v-1' });
    expect(repository.getById).toHaveBeenCalledWith({ id: 'v-1' });
  });

  it('should return vehicle on success', async () => {
    const { sut, repository } = makeSut();
    (repository.getById as jest.Mock).mockResolvedValue(mockVehicle);
    const result = await sut.getById({ id: 'v-1' });
    expect(result).toEqual(mockVehicle);
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.getById as jest.Mock).mockRejectedValue(new Error('not found'));
    await expect(sut.getById({ id: 'v-1' })).rejects.toThrow('not found');
  });
});
