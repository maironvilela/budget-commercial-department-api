import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';

import { TypeormHelper } from '@/infra/db/typeorm/helpers/typeorm-helpers';

let connection: Connection;
let app = null;

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

beforeEach(async () => {
  TypeormHelper.getConnection()
    .then(async () => {
      app = (await import('../config/app')).default;
    })
    .catch(err => {
      console.log(err);
    });
});

beforeAll(async () => {
  connection = await TypeormHelper.getConnection();
  await connection.runMigrations();

  const hashedPassword = await bcrypt.hash(accountFake.password, 12);

  const queryAccount = `INSERT INTO accounts(id, name, email, password, refresh_token, created_at)
VALUES('${accountFake.id}', '${accountFake.name}', '${accountFake.email}','${hashedPassword}','${accountFake.refreshToken}',now())`;

  const queryRoles = `INSERT INTO roles(id, description, account_id, created_at)
VALUES('${roleFaker.id}', '${roleFaker.description}', '${accountFake.id}',now())`;

  const queryRoles2 = `INSERT INTO roles(id, description, account_id, created_at)
VALUES('${roleFaker2.id}', '${roleFaker2.description}', '${accountFake.id}',now())`;

  await connection.query(queryAccount);
  await connection.query(queryRoles);
  await connection.query(queryRoles2);
});

afterEach(async () => {
  await TypeormHelper.disconnect();
});

describe('SigninRoutes', () => {
  test('should success router signup', async () => {
    const response = await request(app).post('/api/signin').send({
      email: accountFake.email,
      password: accountFake.password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body).toHaveProperty('name');
  });
});
