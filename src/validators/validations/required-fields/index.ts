/* eslint-disable @typescript-eslint/dot-notation */
import { MissingParamError } from '@/presentation';
import { Validation } from '@/validators';

export class RequiredFieldsValidations implements Validation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
    return null;
  }
}
