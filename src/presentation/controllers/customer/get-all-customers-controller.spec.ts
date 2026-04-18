import { GetAllCustomersController } from '@/presentation/controllers/customer/get-all-customers-controller';
import { GetAllCustomers } from '@/domain/use-cases';

const makeGetAll = (): GetAllCustomers => ({ getAll: jest.fn() });

const makeSut = () => {
  const getAll = makeGetAll();
  const sut = new GetAllCustomersController(getAll);
  return { sut, getAll };
};

describe('GetAllCustomersController', () => {
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
    (getAll.getAll as jest.Mock).mockRejectedValue(new Error('db error'));
    const result = await sut.handle({ query: { page: 1, limit: 10 } });
    expect(result.statusCode).toBe(500);
  });
});
