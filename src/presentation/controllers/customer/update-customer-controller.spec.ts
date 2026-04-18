import { UpdateCustomerController } from '@/presentation/controllers/customer/update-customer-controller';
import { NotFoundError } from '@/presentation/errors';
import { UpdateCustomer } from '@/domain/use-cases';
import { InvalidFieldError } from '@/validation/errors';
import { CustomerDocumentValidator } from '@/validation/validators';

const makeUpdateCustomer = (): UpdateCustomer => ({ update: jest.fn() });
const makeValidator = (): CustomerDocumentValidator => {
  const v = new CustomerDocumentValidator();
  jest.spyOn(v, 'validate').mockReturnValue(null);
  return v;
};

const makeSut = () => {
  const updateCustomer = makeUpdateCustomer();
  const validator = makeValidator();
  const sut = new UpdateCustomerController(updateCustomer, validator);
  return { sut, updateCustomer, validator };
};

describe('UpdateCustomerController', () => {
  const mockResult = { id: '1', document: '52998224725', name: 'Updated', email: 'j@e.com', createdAt: new Date(), updatedAt: new Date() };

  it('should return 400 if params document is invalid', async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValueOnce(new InvalidFieldError('document'));
    const result = await sut.handle({ params: { document: 'invalid' }, body: { name: 'Test' } });
    expect(result.statusCode).toBe(400);
  });

  it('should return 400 if body document is invalid', async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, 'validate')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(new InvalidFieldError('document'));
    const result = await sut.handle({ params: { document: '52998224725' }, body: { document: 'invalid' } });
    expect(result.statusCode).toBe(400);
  });

  it('should return 200 on success', async () => {
    const { sut, updateCustomer } = makeSut();
    (updateCustomer.update as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.handle({ params: { document: '52998224725' }, body: { name: 'Updated' } });
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockResult);
  });

  it('should return 404 if not found', async () => {
    const { sut, updateCustomer } = makeSut();
    (updateCustomer.update as jest.Mock).mockRejectedValue(new NotFoundError('Customer'));
    const result = await sut.handle({ params: { document: '52998224725' }, body: { name: 'Test' } });
    expect(result.statusCode).toBe(404);
  });

  it('should return 500 on unexpected error', async () => {
    const { sut, updateCustomer } = makeSut();
    (updateCustomer.update as jest.Mock).mockRejectedValue(new Error('err'));
    const result = await sut.handle({ params: { document: '52998224725' }, body: { name: 'Test' } });
    expect(result.statusCode).toBe(500);
  });
});
