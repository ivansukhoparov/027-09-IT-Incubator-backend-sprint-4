import { JwtTokenAdapter } from './adapters/jwt.token.adapter';
import { Injectable } from '@nestjs/common';
import { IToken } from '../base/interfaces/token.interface';
import { appSettings } from '../settings/app.settings';

@Injectable()
export class PasswordRecoveryToken implements IToken {
  private secretKey: string;
  private expiresIn: string;

  constructor(private readonly tokenAdapter: JwtTokenAdapter) {
    this.secretKey = appSettings.api.JWT_SECRET_KEY;
    this.expiresIn = appSettings.api.RECOVERY_TOKEN_EXPIRATION_TIME;
  }

  create(payload: { userId: string }): string {
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
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
