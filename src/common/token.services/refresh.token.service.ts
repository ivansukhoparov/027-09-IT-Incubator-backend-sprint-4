import { Injectable } from '@nestjs/common';
import { appSettings } from '../../settings/app.settings';
import { JwtPayload } from 'jsonwebtoken';
import { BaseToken } from '../../base/base.classes/base.token';
import {
  RefreshTokenDecodedDto,
  RefreshTokenPayloadDto,
} from './types/refresh.token';

export class RefreshTokenService extends BaseToken<
  RefreshTokenPayloadDto,
  RefreshTokenDecodedDto
> {
  constructor() {
    super(
      appSettings.api.JWT_SECRET_KEY,
      appSettings.api.RECOVERY_TOKEN_EXPIRATION_TIME,
    );
  }

  tokenMapper(decodedToken: JwtPayload): RefreshTokenDecodedDto {
    return {
      userId: decodedToken.userId,
      deviceId: decodedToken.deviceId,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  }
}
