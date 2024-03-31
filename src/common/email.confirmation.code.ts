import { Injectable } from '@nestjs/common';
import { appSettings } from '../settings/app.settings';
import { JwtTokenAdapter } from './adapters/jwt.token.adapter';
import { IToken } from '../base/interfaces/token.interface';

@Injectable()
export class EmailConfirmationCode
  implements IToken<ConfirmationCodePayload, ConfirmationCodeDecoded>
{
  private readonly secretKey: string;
  private readonly expiresIn: string;
  private confirmationCode: string;

  constructor(private readonly tokenAdapter: JwtTokenAdapter) {
    this.secretKey = appSettings.api.JWT_SECRET_KEY;
    this.expiresIn = appSettings.api.EMAIL_CONFIRMATION_EXPIRATION_TIME;
  }

  create(payload: ConfirmationCodePayload): void {
    this.confirmationCode = this.tokenAdapter.create(
      payload,
      { expiresIn: this.expiresIn },
      this.secretKey,
    );
  }

  get(): string {
    return this.confirmationCode;
  }

  set(code: string): void {
    this.confirmationCode = code;
  }

  verify(): boolean {
    return this.tokenAdapter.verify(this.confirmationCode, this.secretKey);
  }

  decode(): ConfirmationCodeDecoded | null {
    try {
      const decodedToken: any = this.tokenAdapter.decode(this.confirmationCode);
      return {
        email: decodedToken.email,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export type ConfirmationCodeDecoded = {
  email: string;
  iat: string;
  exp: string;
};

export type ConfirmationCodePayload = {
  email: string;
};
