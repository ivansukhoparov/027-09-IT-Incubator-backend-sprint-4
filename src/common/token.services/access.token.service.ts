import { appSettings } from '../../settings/app.settings';
import { JwtPayload } from 'jsonwebtoken';
import { BaseToken } from '../../base/base.classes/base.token';
import {
  AccessTokenDecodedDto,
  AccessTokenPayloadDto,
} from './types/access.token';

export class AccessTokenService extends BaseToken<
  AccessTokenPayloadDto,
  AccessTokenDecodedDto
> {
  constructor() {
    super(
      appSettings.api.JWT_SECRET_KEY,
      appSettings.api.ACCESS_TOKEN_EXPIRATION_TIME,
    );
  }

  tokenMapper(decodedToken: JwtPayload): AccessTokenDecodedDto {
    return {
      userId: decodedToken.userId,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  }
}
