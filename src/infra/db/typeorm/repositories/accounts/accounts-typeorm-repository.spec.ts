import { faker } from '@faker-js/faker';
import { Connection } from 'typeorm';

import createConnection from '@/infra/db/typeorm';

import { AccountTypeormRepository } from './accounts-typeorm-repository';

let connection: Connection;

const accountFake = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  refreshToken: faker.datatype.uuid(),
};

const roleFaker = {
  id: faker.datatype.uuid(),
  description: faker.name.jobType(),
};

const roleFaker2 = {
  id: faker.datatype.uuid(),
  description: faker.name.jobType(),
};

beforeAll(async () => {
  connection = await createConnection();
  await connection.runMigrations();

  const queryAccount = `INSERT INTO accounts(id, name, email, password, refresh_token, created_at)
VALUES('${accountFake.id}', '${accountFake.name}', '${accountFake.email}','${accountFake.password}','${accountFake.refreshToken}',now())`;

  const queryRoles = `INSERT INTO roles(id, description, account_id, created_at)
VALUES('${roleFaker.id}', '${roleFaker.description}', '${accountFake.id}',now())`;

  const queryRoles2 = `INSERT INTO roles(id, description, account_id, created_at)
VALUES('${roleFaker2.id}', '${roleFaker2.description}', '${accountFake.id}',now())`;

  await connection.query(queryAccount);
  await connection.query(queryRoles);
  await connection.query(queryRoles2);
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.close();
});

describe('AccountTypeormRepository', () => {
  describe('LoadAccountByEmailRepository', () => {
    it('Should return um account on success', async () => {
      const sut = new AccountTypeormRepository();

      const account = await sut.loadByEmail(accountFake.email);

      expect(account).toEqual({
        ...accountFake,
        roles: [roleFaker.description, roleFaker2.description],
      });
    });
  });
});
