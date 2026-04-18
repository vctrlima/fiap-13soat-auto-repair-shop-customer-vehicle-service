import { CustomerDocumentValidator } from '@/validation/validators/customer-document-validator';
import { InvalidFieldError } from '@/validation/errors';

describe('CustomerDocumentValidator', () => {
  const validator = new CustomerDocumentValidator();

  describe('CPF validation', () => {
    it('should return null for valid CPF', () => {
      expect(validator.validate('52998224725')).toBeNull();
    });

    it('should return error for all-same-digit CPF', () => {
      expect(validator.validate('00000000000')).toBeInstanceOf(InvalidFieldError);
      expect(validator.validate('11111111111')).toBeInstanceOf(InvalidFieldError);
    });

    it('should return error for invalid check digits', () => {
      expect(validator.validate('52998224720')).toBeInstanceOf(InvalidFieldError);
    });

    it('should handle formatted CPF', () => {
      expect(validator.validate('529.982.247-25')).toBeNull();
    });
  });

  describe('CNPJ validation', () => {
    it('should return null for valid CNPJ', () => {
      expect(validator.validate('11222333000181')).toBeNull();
    });

    it('should return error for all-same-digit CNPJ', () => {
      expect(validator.validate('00000000000000')).toBeInstanceOf(InvalidFieldError);
    });

    it('should return error for invalid CNPJ', () => {
      expect(validator.validate('11222333000100')).toBeInstanceOf(InvalidFieldError);
    });
  });

  describe('Invalid inputs', () => {
    it('should return error for empty string', () => {
      expect(validator.validate('')).toBeInstanceOf(InvalidFieldError);
    });

    it('should return error for null/undefined', () => {
      expect(validator.validate(null as any)).toBeInstanceOf(InvalidFieldError);
      expect(validator.validate(undefined as any)).toBeInstanceOf(InvalidFieldError);
    });

    it('should return error for wrong length', () => {
      expect(validator.validate('12345')).toBeInstanceOf(InvalidFieldError);
      expect(validator.validate('123456789012345')).toBeInstanceOf(InvalidFieldError);
    });
  });
});
