import { DbGetAllCustomers } from '@/application/use-cases/customer/db-get-all-customers';
import { GetAllCustomersRepository } from '@/application/protocols/db';

const makeRepository = (): GetAllCustomersRepository => ({
  getAll: jest.fn(),
});

const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbGetAllCustomers(repository);
  return { sut, repository };
};

describe('DbGetAllCustomers', () => {
  const mockResult = {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
    content: [
      { id: 'any-id', name: 'John', document: '52998224725', email: 'j@e.com', createdAt: new Date(), updatedAt: null },
    ],
  };

  it('should call repository with correct params', async () => {
    const { sut, repository } = makeSut();
    (repository.getAll as jest.Mock).mockResolvedValue(mockResult);
    const params = { page: 1, limit: 10 };
    await sut.getAll(params);
    expect(repository.getAll).toHaveBeenCalledWith(params);
  });

  it('should return paginated list', async () => {
    const { sut, repository } = makeSut();
    (repository.getAll as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.getAll({ page: 1, limit: 10 });
    expect(result).toEqual(mockResult);
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.getAll as jest.Mock).mockRejectedValue(new Error('db error'));
    await expect(sut.getAll({ page: 1, limit: 10 })).rejects.toThrow('db error');
  });
});
