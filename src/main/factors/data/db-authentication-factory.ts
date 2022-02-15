import bcrypt from '@/config/bcrypt';
import { DbAuthentication } from '@/data';
import { BcryptAdapter, JWTAdapter } from '@/infra';

export const makeDbAuthentication = (): DbAuthentication => {
  const hashCompare = new BcryptAdapter(bcrypt.salt);
  const createAuth = new JWTAdapter();
  const loadAccountByEmailRepository = null;
  return new DbAuthentication(
    loadAccountByEmailRepository,
    hashCompare,
    createAuth,
  );
};
