import bcrypt from 'bcrypt';

import { HashCompare } from '@/data';

export class BcryptAdapter implements HashCompare {
  constructor(private readonly salt: number) {}
  async compare(textPlain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(textPlain, hash);
  }
}
