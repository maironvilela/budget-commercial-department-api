import validator from 'validator';

import { EmailValidation } from '@/validators';

export class EmailValidatorAdapter implements EmailValidation {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
