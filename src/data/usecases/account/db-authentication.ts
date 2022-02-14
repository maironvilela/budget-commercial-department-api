// Refatorar

import { LoadAccountByEmailRepository, HashCompare } from '@/data';
import { Authentication, AuthProps, AuthResponse } from '@/domain';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
  ) {}

  async auth({ email, password }: AuthProps): Promise<AuthResponse> {
    const account = this.loadAccountByEmailRepository.loadByEmail(email);
    this.hashCompare.compare(password, account.password);

    return null;
  }
}
