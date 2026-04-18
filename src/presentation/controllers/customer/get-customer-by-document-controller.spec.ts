import { GetCustomerByDocumentController } from '@/presentation/controllers/customer/get-customer-by-document-controller';
import { NotFoundError } from '@/presentation/errors';
import { GetCustomerByDocument } from '@/domain/use-cases';

const makeGetCustomer = (): GetCustomerByDocument => ({
  getByDocument: jest.fn(),
});

const makeSut = () => {
  const getCustomer = makeGetCustomer();
  const sut = new GetCustomerByDocumentController(getCustomer);
  return { sut, getCustomer };
};

describe('GetCustomerByDocumentController', () => {
  const mockCustomer = { id: '1', name: 'John', document: '52998224725', email: 'j@e.com', createdAt: new Date() };

  it('should call use case with correct document', async () => {
    const { sut, getCustomer } = makeSut();
    (getCustomer.getByDocument as jest.Mock).mockResolvedValue(mockCustomer);
    await sut.handle({ params: { document: '52998224725' } });
    expect(getCustomer.getByDocument).toHaveBeenCalledWith({ document: '52998224725' });
  });

  it('should return 200 with customer', async () => {
    const { sut, getCustomer } = makeSut();
    (getCustomer.getByDocument as jest.Mock).mockResolvedValue(mockCustomer);
    const result = await sut.handle({ params: { document: '52998224725' } });
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockCustomer);
  });

  it('should return 404 if not found', async () => {
    const { sut, getCustomer } = makeSut();
    (getCustomer.getByDocument as jest.Mock).mockRejectedValue(new NotFoundError('Customer'));
    const result = await sut.handle({ params: { document: '52998224725' } });
    expect(result.statusCode).toBe(404);
  });

  it('should return 500 on unexpected error', async () => {
    const { sut, getCustomer } = makeSut();
    (getCustomer.getByDocument as jest.Mock).mockRejectedValue(new Error('unexpected'));
    const result = await sut.handle({ params: { document: '52998224725' } });
    expect(result.statusCode).toBe(500);
  });
});
