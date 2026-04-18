import { UpdateVehicleController } from '@/presentation/controllers/vehicle/update-vehicle-controller';
import { NotFoundError } from '@/presentation/errors';
import { UpdateVehicle } from '@/domain/use-cases';
import { LicensePlateValidator } from '@/validation/validators';

const makeUpdateVehicle = (): UpdateVehicle => ({ update: jest.fn() });
const makeValidator = (): LicensePlateValidator => {
  const v = new LicensePlateValidator();
  jest.spyOn(v, 'validate').mockReturnValue(null);
  return v;
};

const makeSut = () => {
  const updateVehicle = makeUpdateVehicle();
  const validator = makeValidator();
  const sut = new UpdateVehicleController(updateVehicle, validator);
  return { sut, updateVehicle, validator };
};

describe('UpdateVehicleController', () => {
  const mockResult = { id: 'v-1', customerId: 'c-1', licensePlate: 'ABC1234', brand: 'Honda', model: 'Civic', year: 2024 };

  it('should return 400 if no id', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({ params: {}, body: { brand: 'Honda' } });
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if no body', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({ params: { id: 'v-1' } });
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if license plate invalid', async () => {
    const { sut, validator } = makeSut();
    const { InvalidFieldError } = require('@/validation/errors');
    jest.spyOn(validator, 'validate').mockReturnValue(new InvalidFieldError('licensePlate'));
    const result = await sut.handle({ params: { id: 'v-1' }, body: { licensePlate: 'INVALID' } });
    expect(result.statusCode).toBe(400);
  });

  it('should return 200 on success', async () => {
    const { sut, updateVehicle } = makeSut();
    (updateVehicle.update as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.handle({ params: { id: 'v-1' }, body: { brand: 'Honda', model: 'Civic', year: 2024 } });
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockResult);
  });

  it('should return 404 if not found', async () => {
    const { sut, updateVehicle } = makeSut();
    (updateVehicle.update as jest.Mock).mockRejectedValue(new NotFoundError('Vehicle'));
    const result = await sut.handle({ params: { id: 'v-1' }, body: { brand: 'Honda' } });
    expect(result.statusCode).toBe(404);
  });

  it('should return 500 on error', async () => {
    const { sut, updateVehicle } = makeSut();
    (updateVehicle.update as jest.Mock).mockRejectedValue(new Error('err'));
    const result = await sut.handle({ params: { id: 'v-1' }, body: { brand: 'Honda' } });
    expect(result.statusCode).toBe(500);
  });
});
