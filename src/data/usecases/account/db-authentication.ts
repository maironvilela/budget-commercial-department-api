import { LoadAccountByEmailRepository, HashCompare, CreateAuth } from '@/data';
import { Authentication, AuthProps, AuthResponse } from '@/domain';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly createAuth: CreateAuth,
  ) {}

  async auth({ email, password }: AuthProps): Promise<AuthResponse> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email);

    if (account) {
      const isValidPassword = this.hashCompare.compare(
        password,
        account.password,
      );

      if (isValidPassword) {
        const auth = await this.createAuth.create({
          id: account.id,
          email: account.email,
          roles: [account.roles],
        });
        return Object.assign(auth, { name: account.name });
      }
    }

    return null;
  }
}
