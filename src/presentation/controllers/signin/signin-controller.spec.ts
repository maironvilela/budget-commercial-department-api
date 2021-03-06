import { faker } from '@faker-js/faker';

import { Authentication, AuthProps, AuthResponse } from '@/domain';
import {
  badRequest,
  HttpRequest,
  MissingParamError,
  SignInController,
  InvalidParamError,
  Validation,
  serverError,
  ServerError,
  ok,
  unauthorized,
} from '@/presentation';

interface sutTypes {
  sut: SignInController;
  validationStub: Validation;
  authenticationStub: Authentication;
}
const makeSut = (): sutTypes => {
  const authenticationStub = makeAuthenticationStub();
  const validationStub = makeValidationStub();
  const sut = new SignInController(validationStub, authenticationStub);
  return { sut, validationStub, authenticationStub };
};

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth({ email, password }: AuthProps): Promise<AuthResponse> {
      const auth = { token: 'any_token', refreshToken: 'any_refresh_token' };
      return await new Promise(resolve => resolve(auth));
    }
  }
  return new AuthenticationStub();
};

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
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
});

describe('SignInController', () => {
  it('Should call validate function with correct params', async () => {
    const { sut, validationStub } = makeSut();

    const httpRequestFake = makeHttpRequestFake();

    const validateSpy = jest.spyOn(validationStub, 'validate');

    await sut.handle(httpRequestFake);

    expect(validateSpy).toBeCalledWith(httpRequestFake.body);
  });
  it('Should return badRequest with MissingParamError if email not provided', async () => {
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
        email: faker.internet.email(),
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
        email: 'invalid_email',
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
  it('Should call authentication function with correct params ', async () => {
    const { sut, authenticationStub } = makeSut();

    const spyAuth = jest.spyOn(authenticationStub, 'auth');

    const httpRequestFake = makeHttpRequestFake();
    await sut.handle(httpRequestFake);

    expect(spyAuth).toHaveBeenCalledWith(httpRequestFake.body);
  });
  it('Should return SigninController statusCode 200, token and refreshToken in case success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeHttpRequestFake());
    expect(response.statusCode).toEqual(200);
    expect(response).toEqual(
      ok({ token: 'any_token', refreshToken: 'any_refresh_token' }),
    );
  });
  it('Should SigninController return ServerError if validate function fail', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new ServerError('any_stack');
    });

    const response = await sut.handle(makeHttpRequestFake());

    expect(response.statusCode).toEqual(500);
    expect(response).toEqual(serverError(new ServerError('any_stack')));
  });
  it('Should SigninController return ServerError if Authentication function fail', async () => {
    const { sut, authenticationStub } = makeSut();

    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new ServerError('any_stack');
    });

    const response = await sut.handle(makeHttpRequestFake());

    expect(response.statusCode).toEqual(500);
    expect(response).toEqual(serverError(new ServerError('any_stack')));
  });
  it('Should SigninController return Unauthorized if email or password incorrect', async () => {
    const { authenticationStub, sut } = makeSut();

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null);

    const response = await sut.handle(makeHttpRequestFake());

    expect(response).toEqual(unauthorized());
  });
});
