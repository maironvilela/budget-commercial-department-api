import { InvalidParamError, EmailValidation, Validation } from '@/presentation';

export class EmailValidatorValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidation: EmailValidation,
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidation.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
