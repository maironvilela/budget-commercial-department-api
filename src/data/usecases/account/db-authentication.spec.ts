import { HashCompare } from '@/data';
import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository';
import { AccountModel, AuthProps } from '@/domain';
import { faker } from '@faker-js/faker';

import { DbAuthentication } from './db-authentication';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashCompareStub: HashCompare;
};

const makeSut = (): SutTypes => {
  const hashCompareStub = makeHashCompareStub();
  const loadAccountByEmailRepositoryStub =
    makeLoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
  );
  return { sut, loadAccountByEmailRepositoryStub, hashCompareStub };
};

const makeLoadAccountByEmailRepositoryStub =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      loadByEmail(email: string): AccountModel {
        const account = makeReturnAccountModelFaker();
        return account;
      }
    }

    return new LoadAccountByEmailRepositoryStub();
  };

const makeHashCompareStub = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    compare(textPlain: string, hash: string): void {}
  }

  return new HashCompareStub();
};

const makeAuthPropsFake = (): AuthProps => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
const makeReturnAccountModelFaker = (): AccountModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roles: faker.name.jobType(),
  refreshToken: faker.datatype.uuid(),
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

  it('Should return null if findByEmail function does not find the account with the email provided', async () => {
    const { sut } = makeSut();

    const authResult = await sut.auth(makeAuthPropsFake());

    expect(authResult).toBeNull();
  });

  it('Should call compare function with correct params ', async () => {
    const { sut, hashCompareStub, loadAccountByEmailRepositoryStub } =
      makeSut();

    const authPropsFake = makeAuthPropsFake();
    const authResultFake = makeReturnAccountModelFaker();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValue(authResultFake);

    const loadByEmailSpy = jest.spyOn(hashCompareStub, 'compare');

    await sut.auth(authPropsFake);

    expect(loadByEmailSpy).toHaveBeenCalledWith(
      authPropsFake.password,
      authResultFake.password,
    );
  });
  it('Should return null if compare function is called with invalid password', async () => {
    const { sut } = makeSut();

    const authResult = await sut.auth(makeAuthPropsFake());

    expect(authResult).toBeNull();
  });
});

/*
  [x] Buscar o usuário utilizando email
  [x] se usuário nao for encontrado, retornar null,
  [x] Comparar password
  [] retornar null se a senha retornado no usuário da consulta é diferente da senha recebida como parâmetro
  [ ] if as senhas forem diferente, retornar null
  [ ] Criar o token com o email do usuário e as permissões
  [ ] Criar um refresh token com o id do usuário
  [ ] retorna o token,o refresh token e o nome do usuário

*/
