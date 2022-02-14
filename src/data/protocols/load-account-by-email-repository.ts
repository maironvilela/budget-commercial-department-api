import { AccountModel } from '@/domain';

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => AccountModel;
}
