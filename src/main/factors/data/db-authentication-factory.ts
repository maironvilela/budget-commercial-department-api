import bcrypt from '@/config/bcrypt';
import { DbAuthentication } from '@/data';
import { AccountTypeormRepository, BcryptAdapter, JWTAdapter } from '@/infra';

export const makeDbAuthentication = (): DbAuthentication => {
  const hashCompare = new BcryptAdapter(bcrypt.salt);
  const createAuth = new JWTAdapter();

  const loadAccountByEmailRepository = new AccountTypeormRepository();

  return new DbAuthentication(
    loadAccountByEmailRepository,
    hashCompare,
    createAuth,
  );
};
