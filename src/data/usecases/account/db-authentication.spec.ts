// refatorar
import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository';
import { AuthProps } from '@/domain';
import { faker } from '@faker-js/faker';

import { DbAuthentication } from './db-authentication';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub =
    makeLoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
  return { sut, loadAccountByEmailRepositoryStub };
};

const makeLoadAccountByEmailRepositoryStub =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      loadByEmail(email: string): void {}
    }

    return new LoadAccountByEmailRepositoryStub();
  };

const makeAuthPropsFake = (): AuthProps => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe('DbAuthentication', () => {
  it('Should call findByEmail function with correct email ', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    const authPropsFake = makeAuthPropsFake();

    const loadByEmailSpy = jest.spyOn(
      loadAccountByEmailRepositoryStub,
      'loadByEmail',
    );

    await sut.auth(authPropsFake);

    expect(loadByEmailSpy).toHaveBeenCalledWith(authPropsFake.email);
  });
});
