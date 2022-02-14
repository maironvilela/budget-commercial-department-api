export default {
  jwtSecret: process.env.JWT_SECRET || 'secret',
  expiresInRefreshToken:
    Number(process.env.EXPIRES_IN_REFRESH_TOKEN) || 60 * 60 * 12, // 12 horas
  expiresInToken: Number(process.env.EXPIRES_IN_TOKEN) || 60 * 15, // 15 minutos
};
