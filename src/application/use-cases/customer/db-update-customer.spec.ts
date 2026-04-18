import { DbUpdateCustomer } from '@/application/use-cases/customer/db-update-customer';
import { UpdateCustomerRepository } from '@/application/protocols/db';

const makeRepository = (): UpdateCustomerRepository => ({
  update: jest.fn(),
});

const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbUpdateCustomer(repository);
  return { sut, repository };
};

describe('DbUpdateCustomer', () => {
  const params = { document: '52998224725', name: 'Updated Name' };
  const mockResult = { id: 'any-id', document: '52998224725', name: 'Updated Name', email: 'j@e.com', createdAt: new Date(), updatedAt: new Date() };

  it('should call repository with correct params', async () => {
    const { sut, repository } = makeSut();
    (repository.update as jest.Mock).mockResolvedValue(mockResult);
    await sut.update(params);
    expect(repository.update).toHaveBeenCalledWith(params);
  });

  it('should return updated customer', async () => {
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
