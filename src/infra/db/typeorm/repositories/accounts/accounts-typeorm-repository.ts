import { getRepository, Repository } from 'typeorm';

import { LoadAccountByEmailRepository } from '@/data';
import { AccountModel } from '@/domain';

import { Account } from '../../entities/account';

export class AccountTypeormRepository implements LoadAccountByEmailRepository {
  private readonly repository: Repository<Account>;
  constructor() {
    this.repository = getRepository(Account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const account = await this.repository.findOne({
      where: {
        email,
      },
    });
    return account.getAccountModel();
  }
}
