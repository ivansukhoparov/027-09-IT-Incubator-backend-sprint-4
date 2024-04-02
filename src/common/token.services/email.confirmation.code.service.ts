import { Injectable } from '@nestjs/common';
import { appSettings } from '../../settings/app.settings';
import { JwtPayload } from 'jsonwebtoken';
import { BaseToken } from '../../base/base.classes/base.token';
import {
  ConfirmationCodeDecoded,
  ConfirmationCodePayload,
} from './types/email.confirmation.code';

@Injectable()
export class EmailConfirmationCodeService extends BaseToken<
  ConfirmationCodePayload,
  ConfirmationCodeDecoded
> {
  constructor() {
    super(
      appSettings.api.JWT_SECRET_KEY,
      appSettings.api.EMAIL_CONFIRMATION_EXPIRATION_TIME,
    );
  }

  tokenMapper(decodedToken: JwtPayload): ConfirmationCodeDecoded {
    return {
      email: decodedToken.email,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  }
}
