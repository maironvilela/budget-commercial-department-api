import { faker } from '@faker-js/faker';

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
    it('Should return token and refreshToken', () => {
      const { sut } = makeSut();

      const id = faker.datatype.uuid();
      const email = faker.internet.email();
      const roles = [faker.name.jobType()];

      const authResult = sut.create({ id, email, roles });

      expect(authResult.token).toEqual('any_token');
      expect(authResult.refreshToken).toEqual('any_token');
    });
  });
});
