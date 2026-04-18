import { DeleteCustomerController } from '@/presentation/controllers/customer/delete-customer-controller';
import { NotFoundError } from '@/presentation/errors';
import { DeleteCustomer } from '@/domain/use-cases';

const makeDelete = (): DeleteCustomer => ({ delete: jest.fn() });
const makeSut = () => {
  const deleteCustomer = makeDelete();
  const sut = new DeleteCustomerController(deleteCustomer);
  return { sut, deleteCustomer };
};

describe('DeleteCustomerController', () => {
  it('should return 204 on success', async () => {
    const { sut, deleteCustomer } = makeSut();
    (deleteCustomer.delete as jest.Mock).mockResolvedValue(undefined);
    const result = await sut.handle({ params: { document: '52998224725' } });
    expect(result.statusCode).toBe(204);
  });

  it('should return 404 if not found', async () => {
    const { sut, deleteCustomer } = makeSut();
    (deleteCustomer.delete as jest.Mock).mockRejectedValue(new NotFoundError('Customer'));
    const result = await sut.handle({ params: { document: '52998224725' } });
    expect(result.statusCode).toBe(404);
  });

  it('should return 500 on unexpected error', async () => {
    const { sut, deleteCustomer } = makeSut();
    (deleteCustomer.delete as jest.Mock).mockRejectedValue(new Error('unexpected'));
    const result = await sut.handle({ params: { document: '52998224725' } });
    expect(result.statusCode).toBe(500);
  });
});
