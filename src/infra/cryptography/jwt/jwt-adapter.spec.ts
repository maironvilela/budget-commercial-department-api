import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

import { JWTAdapter } from '@/infra';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },
}));

type SutTypes = {
  sut: JWTAdapter;
};
const makeSut = (): SutTypes => {
  const sut = new JWTAdapter();

  return { sut };
};
describe('JWTAdapter', () => {
  describe('create', () => {
    it('Should return token and refreshToken', async () => {
      const { sut } = makeSut();

      const id = faker.datatype.uuid();
      const email = faker.internet.email();
      const roles = [faker.name.jobType()];

      const authResult = await sut.create({ id, email, roles });
      expect(authResult).toEqual({
        token: 'any_token',
        refreshToken: 'any_token',
      });
    });
    it('Should throw if sign function fail', async () => {
      const { sut } = makeSut();

      const id = faker.datatype.uuid();
      const email = faker.internet.email();
      const roles = [faker.name.jobType()];

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });

      const result = sut.create({ id, email, roles });
      await expect(result).rejects.toThrow();
    });
  });
});
