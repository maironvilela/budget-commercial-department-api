// Refatorar

import { LoadAccountByEmailRepository } from '@/data';
import { Authentication, AuthProps, AuthResponse } from '@/domain';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async auth({ email, password }: AuthProps): Promise<AuthResponse> {
    this.loadAccountByEmailRepository.loadByEmail(email);

    return null;
  }
}
