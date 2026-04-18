import { LicensePlateValidator } from '@/validation/validators/license-plate-validator';
import { InvalidFieldError } from '@/validation/errors';

describe('LicensePlateValidator', () => {
  const validator = new LicensePlateValidator();

  it('should return null for valid old format (ABC1234)', () => {
    expect(validator.validate('ABC1234')).toBeNull();
  });

  it('should return null for valid Mercosul format (ABC1D23)', () => {
    expect(validator.validate('ABC1D23')).toBeNull();
  });

  it('should handle lowercase input', () => {
    expect(validator.validate('abc1234')).toBeNull();
  });

  it('should handle dashes and spaces', () => {
    expect(validator.validate('ABC-1234')).toBeNull();
    expect(validator.validate('ABC 1D23')).toBeNull();
  });

  it('should return error for empty input', () => {
    expect(validator.validate('')).toBeInstanceOf(InvalidFieldError);
  });

  it('should return error for null/undefined', () => {
    expect(validator.validate(null as any)).toBeInstanceOf(InvalidFieldError);
    expect(validator.validate(undefined as any)).toBeInstanceOf(InvalidFieldError);
  });

  it('should return error for invalid format', () => {
    expect(validator.validate('1234ABC')).toBeInstanceOf(InvalidFieldError);
    expect(validator.validate('ABCDEFG')).toBeInstanceOf(InvalidFieldError);
    expect(validator.validate('1234567')).toBeInstanceOf(InvalidFieldError);
  });
});
