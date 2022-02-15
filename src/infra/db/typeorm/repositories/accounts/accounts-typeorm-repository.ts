import { Repository } from 'typeorm';

import { LoadAccountByEmailRepository } from '@/data';
import { AccountModel } from '@/domain';

import { Account } from '../../entities/account';

export class AccountTypeormRepository implements LoadAccountByEmailRepository {
  constructor(private readonly repository: Repository<Account>) {}

  async loadByEmail(email: string): Promise<AccountModel> {
    const account = await this.repository.findOne({
      where: {
        email,
      },
    });

    return account.map();
  }
}
