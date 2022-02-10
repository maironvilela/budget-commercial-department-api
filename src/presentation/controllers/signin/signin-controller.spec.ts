import { faker } from '@faker-js/faker';

import { HttpRequest, SignInController } from './signin-controller-protocols';

const makeSut = (): SignInController => new SignInController();

describe('SignInController', () => {
  it('Should return badRequest if username not provided', async () => {
    const sut = makeSut();

    const httpRequestFake: HttpRequest = {
      body: {
        password: faker.internet.password(),
      },
    };
    const response = await sut.handle(httpRequestFake);
    expect(response.statusCode).toBe(400);
  });
});
