/* eslint-disable @typescript-eslint/no-floating-promises */
import { faker } from '@faker-js/faker';

import { EmailValidation } from '@/validators';
import { EmailValidatorValidation } from '.';
import { InvalidParamError } from '@/presentation';

interface SutTypes {
  sut: EmailValidatorValidation;
  emailValidationStub: EmailValidation;
}

const makeSut = (): SutTypes => {
  const emailValidationStub = makeEmailValidationStub();
  const sut = new EmailValidatorValidation('email', emailValidationStub);

  return { sut, emailValidationStub };
};

const makeEmailValidationStub = (): EmailValidation => {
  class EmailValidationStub implements EmailValidation {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidationStub();
};
describe('EmailValidatorValidation', () => {
  it('Should EmailValidatorValidation return undefined if valid email provided', () => {
    const { sut } = makeSut();

    const error = sut.validate({ email: faker.internet.email() });

    expect(error).toBeUndefined();
  });
  it('Should EmailValidatorValidation return InvalidParamError if invalid email provided', () => {
    const { sut, emailValidationStub } = makeSut();

    jest.spyOn(emailValidationStub, 'isValid').mockReturnValueOnce(false);

    const error = sut.validate({ email: 'invalid_email' });

    expect(error).toEqual(new InvalidParamError('email'));
  });
});
