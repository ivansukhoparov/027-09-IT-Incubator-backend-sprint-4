import { JwtTokenAdapter } from './adapters/jwt.token.adapter';
import { Injectable } from '@nestjs/common';
import { IToken } from '../base/interfaces/token.interface';
import { appSettings } from '../settings/app.settings';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class RefreshToken
  implements IToken<RefreshTokenPayloadDto, RefreshTokenDecodedDto>
{
  private readonly secretKey: string;
  private readonly expiresIn: string;
  private token: string;

  constructor(private readonly tokenAdapter: JwtTokenAdapter) {
    this.secretKey = appSettings.api.JWT_SECRET_KEY;
    this.expiresIn = appSettings.api.REFRESH_TOKEN_EXPIRATION_TIME;
  }

  create(payload: RefreshTokenPayloadDto): void {
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

  decode(): RefreshTokenDecodedDto | null {
    try {
      const decodedToken: JwtPayload = this.tokenAdapter.decode(this.token);
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

export type RefreshTokenPayloadDto = { userId: string; deviceId: string };
export type RefreshTokenDecodedDto = JwtPayload & {
  userId: string;
  deviceId: string;
};
