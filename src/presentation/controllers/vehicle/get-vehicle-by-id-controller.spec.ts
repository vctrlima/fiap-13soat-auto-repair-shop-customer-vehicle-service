import { GetVehicleByIdController } from '@/presentation/controllers/vehicle/get-vehicle-by-id-controller';
import { NotFoundError } from '@/presentation/errors';
import { GetVehicleById } from '@/domain/use-cases';

const makeGetVehicle = (): GetVehicleById => ({ getById: jest.fn() });
const makeSut = () => {
  const getVehicle = makeGetVehicle();
  const sut = new GetVehicleByIdController(getVehicle);
  return { sut, getVehicle };
};

describe('GetVehicleByIdController', () => {
  const mockVehicle = { id: 'v-1', customerId: 'c-1', licensePlate: 'ABC1234', brand: 'Toyota', model: 'Corolla', year: 2023 };

  it('should return 200 with vehicle', async () => {
    const { sut, getVehicle } = makeSut();
    (getVehicle.getById as jest.Mock).mockResolvedValue(mockVehicle);
    const result = await sut.handle({ params: { id: 'v-1' } });
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockVehicle);
  });

  it('should return 404 if not found', async () => {
    const { sut, getVehicle } = makeSut();
    (getVehicle.getById as jest.Mock).mockRejectedValue(new NotFoundError('Vehicle'));
    const result = await sut.handle({ params: { id: 'v-1' } });
    expect(result.statusCode).toBe(404);
  });

  it('should return 500 on error', async () => {
    const { sut, getVehicle } = makeSut();
    (getVehicle.getById as jest.Mock).mockRejectedValue(new Error('err'));
    const result = await sut.handle({ params: { id: 'v-1' } });
    expect(result.statusCode).toBe(500);
  });
});
