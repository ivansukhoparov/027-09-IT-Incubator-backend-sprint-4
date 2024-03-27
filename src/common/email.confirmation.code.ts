import { add } from 'date-fns/add';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { appSettings } from '../app.settings';

@Injectable()
export class EmailConfirmationCode {
  private expiresIn: number;

  constructor() {
    this.expiresIn = appSettings.api.EMAIL_CONFIRMATION_EXPIRATION_TIME;
  }

  create(email: string) {
    const confirmationCodeExpiration = add(new Date(), {
      hours: this.expiresIn,
    }).toISOString();
    return `${btoa(uuidv4())}:${btoa(email)}:${btoa(confirmationCodeExpiration)}`;
  }
}
