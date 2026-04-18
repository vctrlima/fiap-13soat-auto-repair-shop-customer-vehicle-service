import { DbUpdateVehicle } from '@/application/use-cases/vehicle/db-update-vehicle';
import { UpdateVehicleRepository } from '@/application/protocols/db';

const makeRepository = (): UpdateVehicleRepository => ({ update: jest.fn() });
const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbUpdateVehicle(repository);
  return { sut, repository };
};

describe('DbUpdateVehicle', () => {
  const params = { id: 'v-1', brand: 'Honda' };
  const mockResult = { id: 'v-1', customerId: 'c-1', licensePlate: 'ABC1234', brand: 'Honda', model: 'Corolla', year: 2023, createdAt: new Date(), updatedAt: new Date() };

  it('should call repository with correct params', async () => {
    const { sut, repository } = makeSut();
    (repository.update as jest.Mock).mockResolvedValue(mockResult);
    await sut.update(params);
    expect(repository.update).toHaveBeenCalledWith(params);
  });

  it('should return updated vehicle', async () => {
    const { sut, repository } = makeSut();
    (repository.update as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.update(params);
    expect(result).toEqual(mockResult);
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.update as jest.Mock).mockRejectedValue(new Error('not found'));
    await expect(sut.update(params)).rejects.toThrow('not found');
  });
});
