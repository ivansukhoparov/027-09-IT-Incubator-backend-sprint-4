import { Injectable } from '@nestjs/common';
import { appSettings } from '../../settings/app.settings';
import { JwtPayload } from 'jsonwebtoken';
import { BaseToken } from '../../base/base.classes/base.token';
import {
  PasswordRecoveryTokenDecodedDto,
  PasswordRecoveryTokenPayloadDto,
} from './types/password.recovery.token';

export class PasswordRecoveryTokenService extends BaseToken<
  PasswordRecoveryTokenPayloadDto,
  PasswordRecoveryTokenDecodedDto
> {
  constructor() {
    super(
      appSettings.api.JWT_SECRET_KEY,
      appSettings.api.RECOVERY_TOKEN_EXPIRATION_TIME,
    );
  }

  tokenMapper(decodedToken: JwtPayload): PasswordRecoveryTokenDecodedDto {
    return {
      userId: decodedToken.userId,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  }
}
