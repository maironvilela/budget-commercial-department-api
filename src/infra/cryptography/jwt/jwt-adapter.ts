import jwt from 'jsonwebtoken';

import auth from '@/config/auth';
import { CreateAuth, CreateAuthProps, CreateAuthResult } from '@/data';

export class JWTAdapter implements CreateAuth {
  async create({
    id,
    email,
    roles,
  }: CreateAuthProps): Promise<CreateAuthResult> {
    const refreshToken = this.encrypted({}, id, auth.expiresInRefreshToken);

    const token = this.encrypted({ roles }, email, auth.expiresInToken);

    return { token, refreshToken };
  }

  private encrypted(payload: any, subject: string, expiresIn: number): string {
    const { sign } = jwt;
    const secret = auth.jwtSecret;
    return sign(payload, secret, {
      subject,
      expiresIn,
    });
  }
}
