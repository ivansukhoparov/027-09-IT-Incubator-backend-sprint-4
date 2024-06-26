import { EmailMessagesManager } from './email.messages.manager';
import { Injectable } from '@nestjs/common';
import { UserType } from '../../features/users/types/output';
import { IEmailAdapter } from '../../base/interfaces/email.adapter.interface';
import { NodemailerAdapter } from '../adapters/nodemailer.adaper';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailAdapter: NodemailerAdapter,
    private readonly messageManager: EmailMessagesManager,
  ) {}

  async sendEmailConfirmationEmail(user: UserType, confirmationCode: string) {
    return await this.emailAdapter.sendEmail(
      user.email,
      this.messageManager.confirmationEmail(confirmationCode, user.login),
    );
  }

  async reSendEmailConfirmationEmail(user: UserType, confirmationCode: string) {
    return await this.emailAdapter.sendEmail(
      user.email,
      this.messageManager.reConfirmationEmail(confirmationCode, user.email),
    );
  }

  async sendPasswordRecoveryCode(user: UserType, recoveryCode: string) {
    return await this.emailAdapter.sendEmail(
      user.email,
      this.messageManager.resetPassword(recoveryCode),
    );
  }
}
