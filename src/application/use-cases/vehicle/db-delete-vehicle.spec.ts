import { DbDeleteVehicle } from '@/application/use-cases/vehicle/db-delete-vehicle';
import { DeleteVehicleRepository } from '@/application/protocols/db';

const makeRepository = (): DeleteVehicleRepository => ({ delete: jest.fn() });
const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbDeleteVehicle(repository);
  return { sut, repository };
};

describe('DbDeleteVehicle', () => {
  it('should call repository with correct id', async () => {
    const { sut, repository } = makeSut();
    (repository.delete as jest.Mock).mockResolvedValue(undefined);
    await sut.delete({ id: 'v-1' });
    expect(repository.delete).toHaveBeenCalledWith({ id: 'v-1' });
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.delete as jest.Mock).mockRejectedValue(new Error('not found'));
    await expect(sut.delete({ id: 'v-1' })).rejects.toThrow('not found');
  });
});
