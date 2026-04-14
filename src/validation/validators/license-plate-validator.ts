import { InvalidFieldError } from '@/validation/errors';
import { type ParameterValidator } from '@/validation/protocols';

export class LicensePlateValidator implements ParameterValidator {
  validate(input: string): Error | null {
    if (!input || typeof input !== 'string') {
      return new InvalidFieldError('licensePlate');
    }
    const cleanPlate = input.replace(/[\s-]/g, '').toUpperCase();
    const oldFormat = /^[A-Z]{3}\d{4}$/;
    const mercosulFormat = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (oldFormat.test(cleanPlate) || mercosulFormat.test(cleanPlate)) {
      return null;
    }
    return new InvalidFieldError('licensePlate');
  }
}
