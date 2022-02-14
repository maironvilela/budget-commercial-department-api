import bcrypt from '@/config/bcrypt';
import { DbAuthentication } from '@/data';
import { BcryptAdapter } from '@/infra';

export const makeDbAuthentication = (): DbAuthentication => {
  const hashCompare = new BcryptAdapter(bcrypt.salt);
  const loadAccountByEmailRepository = null;
  const createAuth = null;
  return new DbAuthentication(
    loadAccountByEmailRepository,
    hashCompare,
    createAuth,
  );
};
