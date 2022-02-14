export default {
  salt: Number(process.env.BCRYPT_SALT) || 12,
};
