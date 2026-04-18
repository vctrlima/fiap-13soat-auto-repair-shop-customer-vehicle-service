import { GetAllVehiclesController } from '@/presentation/controllers/vehicle/get-all-vehicles-controller';
import { GetAllVehicles } from '@/domain/use-cases';

const makeGetAll = (): GetAllVehicles => ({ getAll: jest.fn() });
const makeSut = () => {
  const getAll = makeGetAll();
  const sut = new GetAllVehiclesController(getAll);
  return { sut, getAll };
};

describe('GetAllVehiclesController', () => {
  const mockResult = { page: 1, limit: 10, total: 0, totalPages: 0, content: [] };

  it('should return 200 with paginated result', async () => {
    const { sut, getAll } = makeSut();
    (getAll.getAll as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.handle({ query: { page: 1, limit: 10 } });
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockResult);
  });

  it('should return 500 on error', async () => {
    const { sut, getAll } = makeSut();
    (getAll.getAll as jest.Mock).mockRejectedValue(new Error('err'));
    const result = await sut.handle({ query: { page: 1, limit: 10 } });
    expect(result.statusCode).toBe(500);
  });
});
