import { CreateVehicleController } from '@/presentation/controllers/vehicle/create-vehicle-controller';
import { CreateVehicle } from '@/domain/use-cases';
import { LicensePlateValidator } from '@/validation/validators';

const makeCreateVehicle = (): CreateVehicle => ({ create: jest.fn() });
const makeValidator = (): LicensePlateValidator => {
  const v = new LicensePlateValidator();
  jest.spyOn(v, 'validate').mockReturnValue(null);
  return v;
};

const makeSut = () => {
  const createVehicle = makeCreateVehicle();
  const validator = makeValidator();
  const sut = new CreateVehicleController(createVehicle, validator);
  return { sut, createVehicle, validator };
};

describe('CreateVehicleController', () => {
  const body = { customerId: 'c-1', licensePlate: 'ABC1234', brand: 'Toyota', model: 'Corolla', year: 2023 };
  const mockResult = { id: 'v-1', ...body, createdAt: new Date(), updatedAt: null };

  it('should return 400 if no body', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({} as any);
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if license plate is invalid', async () => {
    const { sut, validator } = makeSut();
    const { InvalidFieldError } = require('@/validation/errors');
    jest.spyOn(validator, 'validate').mockReturnValue(new InvalidFieldError('licensePlate'));
    const result = await sut.handle({ body });
    expect(result.statusCode).toBe(400);
  });

  it('should return 201 on success', async () => {
    const { sut, createVehicle } = makeSut();
    (createVehicle.create as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.handle({ body });
    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(mockResult);
  });

  it('should return 500 on error', async () => {
    const { sut, createVehicle } = makeSut();
    (createVehicle.create as jest.Mock).mockRejectedValue(new Error('err'));
    const result = await sut.handle({ body });
    expect(result.statusCode).toBe(500);
  });
});
