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
});
