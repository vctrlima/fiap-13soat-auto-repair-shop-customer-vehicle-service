import { CreateCustomerController } from '@/presentation/controllers/customer/create-customer-controller';
import { MissingParamError } from '@/presentation/errors';
import { InvalidFieldError } from '@/validation/errors';
import { CustomerDocumentValidator } from '@/validation/validators';
import { CreateCustomer } from '@/domain/use-cases';

const makeCreateCustomer = (): CreateCustomer => ({
  create: jest.fn(),
});

const makeValidator = (): CustomerDocumentValidator => {
  const validator = new CustomerDocumentValidator();
  jest.spyOn(validator, 'validate').mockReturnValue(null);
  return validator;
};

const makeSut = () => {
  const createCustomer = makeCreateCustomer();
  const validator = makeValidator();
  const sut = new CreateCustomerController(createCustomer, validator);
  return { sut, createCustomer, validator };
};

describe('CreateCustomerController', () => {
  const mockBody = { name: 'John', document: '52998224725', email: 'j@e.com' };
  const mockResult = { id: '1', ...mockBody, createdAt: new Date(), updatedAt: null };

  it('should return 400 if no body', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({} as any);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBeInstanceOf(MissingParamError);
  });

  it('should return 400 if document is invalid', async () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValue(new InvalidFieldError('document'));
    const result = await sut.handle({ body: { ...mockBody, document: 'invalid' } });
    expect(result.statusCode).toBe(400);
  });

  it('should return 201 on success', async () => {
    const { sut, createCustomer } = makeSut();
    (createCustomer.create as jest.Mock).mockResolvedValue(mockResult);
    const result = await sut.handle({ body: mockBody });
    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(mockResult);
  });

  it('should return 400 if use case throws InvalidFieldError', async () => {
    const { sut, createCustomer } = makeSut();
    (createCustomer.create as jest.Mock).mockRejectedValue(new InvalidFieldError('document'));
    const result = await sut.handle({ body: mockBody });
    expect(result.statusCode).toBe(400);
  });

  it('should return 500 on unexpected error', async () => {
    const { sut, createCustomer } = makeSut();
    (createCustomer.create as jest.Mock).mockRejectedValue(new Error('unexpected'));
    const result = await sut.handle({ body: mockBody });
    expect(result.statusCode).toBe(500);
  });
});
