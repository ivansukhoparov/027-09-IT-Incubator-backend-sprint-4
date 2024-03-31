import { add } from 'date-fns/add';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { appSettings } from '../settings/app.settings';
import { IToken } from '../base/interfaces/token.interface';
import { JwtTokenAdapter } from './adapters/jwt.token.adapter';

@Injectable()
export class EmailConfirmationCode {
  private secretKey: string;
  private expiresIn: string;

  constructor(private readonly tokenAdapter: JwtTokenAdapter) {
    this.secretKey = appSettings.api.JWT_SECRET_KEY;
    this.expiresIn = appSettings.api.EMAIL_CONFIRMATION_EXPIRATION_TIME;
  }

  create(payload: { userId: string; deviceId: string }): string {
    return this.tokenAdapter.create(
      payload,
      { expiresIn: this.expiresIn },
      this.secretKey,
    );
  }

  async verify(token: string): Promise<boolean> {
    return this.tokenAdapter.verify(token, this.secretKey);
  }

  decode(token: string): object | null {
    try {
      const decodedToken: any = this.tokenAdapter.decode(token);
      return {
        userId: decodedToken.userId,
        deviceId: decodedToken.deviceId,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
