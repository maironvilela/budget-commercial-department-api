import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra';

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(12);
};

describe('BcryptAdapter', () => {
  describe('HashCompare', () => {
    it('Should return true if valid password provided', async () => {
      const sut = makeSut();

      const textPlain = '123';
      const hash = await bcrypt.hash(textPlain, 12);

      const result = await sut.compare(textPlain, hash);

      expect(result).toEqual(true);
    });

    it('Should return false if valid password provided', async () => {
      const sut = makeSut();

      const textPlain = '123';
      const hash = await bcrypt.hash('invalid_text_plain', 12);

      const result = await sut.compare(textPlain, hash);

      expect(result).toEqual(false);
    });
  });
});
