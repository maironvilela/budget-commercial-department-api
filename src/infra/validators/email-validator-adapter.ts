import { EmailValidation } from '@/validators';
import validator from 'validator';

export class EmailValidatorAdapter implements EmailValidation {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
