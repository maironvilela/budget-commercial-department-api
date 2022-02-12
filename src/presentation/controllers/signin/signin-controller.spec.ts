import { faker } from '@faker-js/faker';

import {
  badRequest,
  HttpRequest,
  MissingParamError,
  SignInController,
  InvalidParamError,
  Validation,
} from '@/presentation';

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

const makeHttpRequestFake = (): HttpRequest => ({
  body: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
});

const makeSut = (): sutTypes => {
  const validationStub = makeValidationStub();
  const sut = new SignInController(validationStub);
  return { sut, validationStub };
};

describe('SignInController', () => {
  it('Should call validate function to validate the fields', async () => {
    const { sut, validationStub } = makeSut();

    const httpRequestFake = makeHttpRequestFake();

    const validateSpy = jest.spyOn(validationStub, 'validate');

    await sut.handle(httpRequestFake);

    expect(validateSpy).toBeCalledWith(httpRequestFake.body);
  });
  it('Should return badRequest with MissingParamError if username not provided', async () => {
    const { sut, validationStub } = makeSut();
    const httpRequestFake: HttpRequest = {
      body: {
        password: faker.internet.password(),
      },
    };
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValue(new MissingParamError('email'));

    const response = await sut.handle(httpRequestFake);

    expect(response.statusCode).toBe(400);
    expect(response).toEqual(badRequest(new MissingParamError('email')));
  });
  it('Should return badRequest with MissingParamError if password not provided', async () => {
    const { sut, validationStub } = makeSut();
    const httpRequestFake: HttpRequest = {
      body: {
        username: faker.internet.userName(),
      },
    };

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValue(new MissingParamError('password'));

    const response = await sut.handle(httpRequestFake);
    expect(response.statusCode).toBe(400);
    expect(response).toEqual(badRequest(new MissingParamError('password')));
  });
  it('Should return badRequest with InvalidParamError if email provided is invalid', async () => {
    const { sut, validationStub } = makeSut();

    const httpRequestFake: HttpRequest = {
      body: {
        username: 'invalid_email',
        password: faker.internet.password(),
      },
    };

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValue(new InvalidParamError('email'));

    const response = await sut.handle(httpRequestFake);

    expect(response.statusCode).toEqual(400);
    expect(response).toEqual(badRequest(new InvalidParamError('email')));
  });
});
