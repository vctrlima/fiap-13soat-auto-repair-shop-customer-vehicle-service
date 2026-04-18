import { DbGetCustomerByDocument } from '@/application/use-cases/customer/db-get-customer-by-document';
import { GetCustomerByDocumentRepository } from '@/application/protocols/db';

const makeRepository = (): GetCustomerByDocumentRepository => ({
  getByDocument: jest.fn(),
});

const makeSut = () => {
  const repository = makeRepository();
  const sut = new DbGetCustomerByDocument(repository);
  return { sut, repository };
};

describe('DbGetCustomerByDocument', () => {
  const mockCustomer = {
    id: 'any-id',
    name: 'John Doe',
    document: '52998224725',
    email: 'john@example.com',
    createdAt: new Date(),
    updatedAt: null,
  };

  it('should call repository with correct params', async () => {
    const { sut, repository } = makeSut();
    (repository.getByDocument as jest.Mock).mockResolvedValue(mockCustomer);
    await sut.getByDocument({ document: '52998224725' });
    expect(repository.getByDocument).toHaveBeenCalledWith({ document: '52998224725' });
  });

  it('should return customer on success', async () => {
    const { sut, repository } = makeSut();
    (repository.getByDocument as jest.Mock).mockResolvedValue(mockCustomer);
    const result = await sut.getByDocument({ document: '52998224725' });
    expect(result).toEqual(mockCustomer);
  });

  it('should throw if repository throws', async () => {
    const { sut, repository } = makeSut();
    (repository.getByDocument as jest.Mock).mockRejectedValue(new Error('not found'));
    await expect(sut.getByDocument({ document: '52998224725' })).rejects.toThrow('not found');
  });
});
