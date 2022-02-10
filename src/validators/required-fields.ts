import { MissingParamError } from '../presentation/errors';
import { Validation } from './validation';

export class RequiredFieldsValidations implements Validation {
  constructor(private readonly field: string) {}
  validate(input: any): Error | null {
    if (!input[this.field]) {
      return new MissingParamError(this.field);
    }

    return null;
  }
}
