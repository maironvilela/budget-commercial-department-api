import { MissingParamError } from '@/presentation';
import { faker } from '@faker-js/faker';

import { RequiredFieldsValidations } from '.';

const makeSut = (): RequiredFieldsValidations => {
  return new RequiredFieldsValidations('email');
};

describe('RequiredFieldsValidations', () => {
  it('Should RequiredFieldsValidations return null if correct field provided ', () => {
    const sut = makeSut();

    const result = sut.validate({ email: faker.internet.email() });

    expect(result).toBeNull();
  });

  it('Should RequiredFieldsValidations return MissingParamError if field not provided ', () => {
    const sut = makeSut();

    const result = sut.validate({});

    expect(result).toEqual(new MissingParamError('email'));
  });
});
