import jwt from 'jsonwebtoken';

import auth from '@/config/auth';
import { CreateAuth, CreateAuthProps, CreateAuthResult } from '@/data';

export class JWTAdapter implements CreateAuth {
  create({ id, email, roles }: CreateAuthProps): CreateAuthResult {
    const { expiresInRefreshToken, jwtSecret } = auth;

    const refreshToken = jwt.sign({}, jwtSecret, {
      subject: id,
      expiresIn: expiresInRefreshToken,
    });

    const token = jwt.sign({ roles }, jwtSecret, {
      subject: email,
      expiresIn: expiresInRefreshToken,
    });

    return { token, refreshToken };
  }
}
