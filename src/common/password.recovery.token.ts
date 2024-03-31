import { JwtTokenAdapter } from './adapters/jwt.token.adapter';
import { Injectable } from '@nestjs/common';
import { IToken } from '../base/interfaces/token.interface';
import { appSettings } from '../settings/app.settings';

@Injectable()
export class PasswordRecoveryToken
  implements
    IToken<PasswordRecoveryTokenPayloadDto, PasswordRecoveryTokenDecodedDto>
{
  private readonly secretKey: string;
  private readonly expiresIn: string;
  private token: string;

  constructor(private readonly tokenAdapter: JwtTokenAdapter) {
    this.secretKey = appSettings.api.JWT_SECRET_KEY;
    this.expiresIn = appSettings.api.ACCESS_TOKEN_EXPIRATION_TIME;
  }

  create(payload: PasswordRecoveryTokenPayloadDto): void {
    this.token = this.tokenAdapter.create(
      payload,
      { expiresIn: this.expiresIn },
      this.secretKey,
    );
  }

  get(): string {
    return this.token;
  }

  set(token: string): void {
    this.token = token;
  }

  verify(): boolean {
    return this.tokenAdapter.verify(this.token, this.secretKey);
  }

  decode(): PasswordRecoveryTokenDecodedDto | null {
    try {
      const decodedToken: any = this.tokenAdapter.decode(this.token);
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

export type PasswordRecoveryTokenPayloadDto = { userId: string };
export type PasswordRecoveryTokenDecodedDto = {
  userId: string;
  iat: string;
  exp: string;
};
