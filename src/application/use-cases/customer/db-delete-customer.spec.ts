import { DbDeleteCustomer } from '@/application/use-cases/customer/db-delete-customer';
import { DeleteCustomerRepository } from '@/application/protocols/db';

const makeRepository = (): DeleteCustomerRepository => ({
  delete: jest.fn(),
});

const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbDeleteCustomer(repository);
  return { sut, repository };
};

describe('DbDeleteCustomer', () => {
  it('should call repository with correct params', async () => {
    const { sut, repository } = makeSut();
    (repository.delete as jest.Mock).mockResolvedValue(undefined);
    await sut.delete({ document: '52998224725' });
    expect(repository.delete).toHaveBeenCalledWith({ document: '52998224725' });
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.delete as jest.Mock).mockRejectedValue(new Error('not found'));
    await expect(sut.delete({ document: '52998224725' })).rejects.toThrow('not found');
  });
});
