import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

import auth from '@/config/auth';
import { CreateAuthResult } from '@/data';
import { JWTAdapter } from '@/infra';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<CreateAuthResult> {
    return await new Promise(resolve =>
      resolve({ token: 'any_token', refreshToken: 'any_refresh_token' }),
    );
  },
}));

const makeSut = (): JWTAdapter => {
  return new JWTAdapter();
};
describe('JWTAdapter', () => {
  it('Should return token and refreshToken', async () => {
    const { sign } = jwt;

    const { jwtSecret, expiresInToken, expiresInRefreshToken } = auth;

    const id = faker.datatype.uuid();
    const email = faker.internet.email();
    const roles = [faker.name.jobType()];

    const authResult = await makeSut().create({ id, email, roles });

    const token = sign({ roles }, jwtSecret, {
      subject: email,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({}, jwtSecret, {
      subject: id,
      expiresIn: expiresInRefreshToken,
    });

    expect(authResult.token).toEqual(token);
    expect(authResult.refreshToken).toEqual(refreshToken);
  });
});
