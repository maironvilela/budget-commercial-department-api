import { faker } from '@faker-js/faker';
import { Validation } from '../../../validators';

import { HttpRequest, SignInController } from './signin-controller-protocols';

interface sutTypes {
  sut: SignInController;
  validationStub: Validation;
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeSut = (): sutTypes => {
  const validationStub = makeValidationStub();
  const sut = new SignInController(validationStub);
  return { sut, validationStub };
};

describe('SignInController', () => {
  it('Should return badRequest if username not provided', async () => {
    const { sut, validationStub } = makeSut();
    const httpRequestFake: HttpRequest = {
      body: {
        password: faker.internet.password(),
      },
    };

    jest.spyOn(validationStub, 'validate').mockReturnValue(new Error());

    const response = await sut.handle(httpRequestFake);
    expect(response.statusCode).toBe(400);
  });
});
