import { EmailValidatorAdapter } from '@/infra';
import { EmailValidatorValidation } from '@/validators';

export const makeEmailValidatorValidation = (
  field: string,
): EmailValidatorValidation => {
  const emailValidation = new EmailValidatorAdapter();
  return new EmailValidatorValidation(field, emailValidation);
};
