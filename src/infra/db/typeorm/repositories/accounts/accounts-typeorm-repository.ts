/* eslint-disable @typescript-eslint/prefer-readonly */
import { getRepository, Repository } from 'typeorm';

import { LoadAccountByEmailRepository } from '@/data';
import { AccountModel } from '@/domain';

import { Account } from '../../entities/account';

export class AccountTypeormRepository implements LoadAccountByEmailRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const account = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (account) {
      const accountModel = account.getAccountModel();
      return accountModel;
    }

    return null;
  }
}
