import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptAdapter {
  async createHash(string: string) {
    return await bcrypt.hash(string, 10);
  }
}
