import { EmailMessagesManager } from './email.messages.manager';
import { Injectable } from '@nestjs/common';
import { UserType } from '../../features/users/types/output';
import { IEmailAdapter } from '../../base/interfaces/email.adapter.interface';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailAdapter: IEmailAdapter,
    private readonly messageManager: EmailMessagesManager,
  ) {}

  async sendEmailConfirmationEmail(user: UserType) {
    return await this.emailAdapter.sendEmail(
      user.email,
      this.messageManager.confirmationEmail(
        user.emailConfirmation.confirmationCode,
        user.email,
      ),
    );
  }

  async reSendEmailConfirmationEmail(user: UserType) {
    return await this.emailAdapter.sendEmail(
      user.email,
      this.messageManager.reConfirmationEmail(
        user.emailConfirmation.confirmationCode,
        user.email,
      ),
    );
  }

  async sendPasswordRecoveryCode(user: UserType, recoveryCode: string) {
    return await this.emailAdapter.sendEmail(
      user.email,
      this.messageManager.resetPassword(recoveryCode),
    );
  }
}
