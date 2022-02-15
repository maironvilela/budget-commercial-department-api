import jwt from 'jsonwebtoken';

import auth from '@/config/auth';
import { CreateAuth, CreateAuthProps, CreateAuthResult } from '@/data';

export class JWTAdapter implements CreateAuth {
  async create({
    id,
    email,
    roles,
  }: CreateAuthProps): Promise<CreateAuthResult> {
    const { expiresInRefreshToken, jwtSecret } = auth;

    const refreshToken = jwt.sign({}, jwtSecret, {
      subject: id,
      expiresIn: expiresInRefreshToken,
    });

    const token = jwt.sign({ roles }, jwtSecret, {
      subject: email,
      expiresIn: expiresInRefreshToken,
    });

    return await new Promise(resolve => resolve({ token, refreshToken }));
  }
}
