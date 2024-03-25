import { BcryptAdapter } from './bcrypt.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordAdapter {
  constructor(private readonly encryptAdapter: BcryptAdapter) {}
  async getNewHash(password: string) {
    return await this.encryptAdapter.createHash(password);
  }
}
