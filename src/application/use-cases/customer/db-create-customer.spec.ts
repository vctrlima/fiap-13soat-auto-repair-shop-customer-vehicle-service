import { DbCreateCustomer } from '@/application/use-cases/customer/db-create-customer';
import { CreateCustomerRepository } from '@/application/protocols/db';

jest.mock('@/infra/observability', () => ({
  customerCreatedCounter: { add: jest.fn() },
}));

const makeRepository = (): CreateCustomerRepository => ({
  create: jest.fn(),
});

const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbCreateCustomer(repository);
  return { sut, repository };
};

describe('DbCreateCustomer', () => {
  const params = {
    name: 'John Doe',
    document: '52998224725',
    email: 'john@example.com',
    phone: '+5511999990000',
  };

  const mockResult = {
    id: 'any-id',
    ...params,
    createdAt: new Date(),
    updatedAt: null,
  };

  it('should call repository with correct params', async () => {
    const { sut, repository } = makeSut();
    (repository.create as jest.Mock).mockResolvedValue(mockResult);
    await sut.create(params);
    expect(repository.create).toHaveBeenCalledWith(params);
  });

  it('should return the created customer', async () => {
    const { sut, repository } = makeSut();
    (repository.create as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.create(params);
    expect(result).toEqual(mockResult);
  });

  it('should increment counter on success', async () => {
    const { sut, repository } = makeSut();
    const { customerCreatedCounter } = require('@/infra/observability');
    (repository.create as jest.Mock).mockResolvedValue(mockResult);
    await sut.create(params);
    expect(customerCreatedCounter.add).toHaveBeenCalledWith(1);
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.create as jest.Mock).mockRejectedValue(new Error('db error'));
    await expect(sut.create(params)).rejects.toThrow('db error');
  });
});
