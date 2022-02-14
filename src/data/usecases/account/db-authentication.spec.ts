import {
  CreateAuth,
  HashCompare,
  CreateAuthResult,
  CreateAuthProps,
  LoadAccountByEmailRepository,
} from '@/data';
import { AccountModel, AuthProps } from '@/domain';
import { faker } from '@faker-js/faker';

import { DbAuthentication } from './db-authentication';

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashCompareStub: HashCompare;
  createAuthStub: CreateAuth;
};

const makeSut = (): SutTypes => {
  const createAuthStub = makeCreateAuth();
  const hashCompareStub = makeHashCompareStub();
  const loadAccountByEmailRepositoryStub =
    makeLoadAccountByEmailRepositoryStub();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    createAuthStub,
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    createAuthStub,
  };
};

const makeCreateAuth = (): CreateAuth => {
  class CreateAuthStub implements CreateAuth {
    async create(data: CreateAuthProps): Promise<CreateAuthResult> {
      const authResult = makeCreateAuthResultFake();
      return await new Promise(resolve => resolve(authResult));
    }
  }

  return new CreateAuthStub();
};

const makeLoadAccountByEmailRepositoryStub =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadByEmail(email: string): Promise<AccountModel> {
        const account = makeAccountModelResultFaker();
        return await new Promise(resolve => resolve(account));
      }
    }

    return new LoadAccountByEmailRepositoryStub();
  };

const makeHashCompareStub = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    compare(textPlain: string, hash: string): boolean {
      return true;
    }
  }

  return new HashCompareStub();
};

// data
const makeAuthPropsFake = (): AuthProps => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
const makeAccountModelResultFaker = (): AccountModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roles: faker.name.jobType(),
  refreshToken: faker.datatype.uuid(),
});
const makeCreateAuthResultFake = (): CreateAuthResult => ({
  name: faker.name.findName(),
  token: faker.datatype.uuid(),
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
    const authResultFake = makeAccountModelResultFaker();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValue(new Promise(resolve => resolve(authResultFake)));

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
  it('Should call createAuth with correct params', async () => {
    console.log('### ###');
    const { sut, createAuthStub, loadAccountByEmailRepositoryStub } = makeSut();

    const authPropsFake = makeAuthPropsFake();
    const accountModelFake = makeAccountModelResultFaker();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve(accountModelFake)));

    const createSpy = jest.spyOn(createAuthStub, 'create');

    await sut.auth(authPropsFake);

    expect(createSpy).toHaveBeenCalledWith({
      id: accountModelFake.id,
      email: accountModelFake.email,
      roles: [accountModelFake.roles],
    });
  });
});

/*
  [x] Buscar o usuário utilizando email
  [x] se usuário nao for encontrado, retornar null,
  [x] Comparar password
  [x] retornar null se a senha retornado no usuário da consulta é diferente da senha recebida como parâmetro
  [ x] if as senhas forem diferente, retornar null
  [ ] Criar o token com o email do usuário e as permissões
  [ ] Criar um refresh token com o id do usuário
  [ ] retorna o token,o refresh token e o nome do usuário

*/
