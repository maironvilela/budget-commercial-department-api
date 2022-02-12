import { MissingParamError } from '@/presentation';
import { Validation } from '../protocols/validation';

export class RequiredFieldsValidations implements Validation {
  constructor(private readonly field: string) {}
  validate(input: any): Error | null {
    if (!input[this.field]) {
      return new MissingParamError(this.field);
    }
    return null;
  }
}
