import {
  UserConfirmationCodeDto,
  UserEmailDto,
  UserRegistrationDto,
} from '../types/input';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/application/users.service';
import { EmailConfirmationCode } from '../../../common/email.confirmation.code';
import { EmailService } from '../../../common/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly emailConfirmationCode: EmailConfirmationCode,
    private readonly emailService: EmailService,
  ) {}

  async registerUser(registrationDto: UserRegistrationDto) {
    const createdUserId = await this.userService.create(registrationDto, false);
    const createdUser = await this.userService.getUserById(createdUserId);
    if (!createdUser) return false;
    this.emailConfirmationCode.create({ email: createdUser.email });
    const isEmailSent = await this.emailService.sendEmailConfirmationEmail(
      createdUser,
      this.emailConfirmationCode.get(),
    );
    if (!isEmailSent) {
      await this.userService.delete(createdUser.id);
      return false;
    }
    return true;
  }

  async resendConfirmationCode(email: UserEmailDto) {
    const user = await this.userService.getUserByLoginOrEmail(email.email);
    if (!user) return false;
    if (user.isConfirmed) return false;

    this.emailConfirmationCode.create(email);

    const isEmailSent = await this.emailService.reSendEmailConfirmationEmail(
      user,
      this.emailConfirmationCode.get(),
    );
    return true;
  }

  async confirmEmail(confirmationCode: UserConfirmationCodeDto) {
    this.emailConfirmationCode.set(confirmationCode.code);

    if (!this.emailConfirmationCode.verify()) return false;

    const user = await this.userService.getUserByLoginOrEmail(
      this.emailConfirmationCode.decode().email,
    );

    if (!user) return false;
    if (user.isConfirmed) return false;

    return await this.userService.updateUserConfirmationStatus(user.id);
  }
}
