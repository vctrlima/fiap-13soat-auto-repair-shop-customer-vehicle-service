import { DeleteVehicleController } from '@/presentation/controllers/vehicle/delete-vehicle-controller';
import { NotFoundError } from '@/presentation/errors';
import { DeleteVehicle } from '@/domain/use-cases';

const makeDeleteVehicle = (): DeleteVehicle => ({ delete: jest.fn() });
const makeSut = () => {
  const deleteVehicle = makeDeleteVehicle();
  const sut = new DeleteVehicleController(deleteVehicle);
  return { sut, deleteVehicle };
};

describe('DeleteVehicleController', () => {
  it('should return 204 on success', async () => {
    const { sut, deleteVehicle } = makeSut();
    (deleteVehicle.delete as jest.Mock).mockResolvedValue(undefined);
    const result = await sut.handle({ params: { id: 'v-1' } });
    expect(result.statusCode).toBe(204);
  });

  it('should return 404 if not found', async () => {
    const { sut, deleteVehicle } = makeSut();
    (deleteVehicle.delete as jest.Mock).mockRejectedValue(new NotFoundError('Vehicle'));
    const result = await sut.handle({ params: { id: 'v-1' } });
    expect(result.statusCode).toBe(404);
  });

  it('should return 500 on error', async () => {
    const { sut, deleteVehicle } = makeSut();
    (deleteVehicle.delete as jest.Mock).mockRejectedValue(new Error('err'));
    const result = await sut.handle({ params: { id: 'v-1' } });
    expect(result.statusCode).toBe(500);
  });
});
