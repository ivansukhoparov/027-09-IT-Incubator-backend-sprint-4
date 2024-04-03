import {
  UserConfirmationCodeDto,
  UserEmailDto,
  UserLoginDto,
  UserRegistrationDto,
} from '../types/input';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/application/users.service';

import { EmailService } from '../../../common/email/email.service';
import { BcryptAdapter } from '../../../common/adapters/bcrypt.adapter';
import { EmailConfirmationCodeService } from '../../../common/token.services/email.confirmation.code.service';
import { AccessTokenService } from '../../../common/token.services/access.token.service';
import { RefreshTokenService } from '../../../common/token.services/refresh.token.service';
import { tokenServiceCommands } from '../../../common/token.services/utils/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
    private readonly cryptAdapter: BcryptAdapter,
  ) {}

  async registerUser(registrationDto: UserRegistrationDto) {
    const createdUserId = await this.userService.create(registrationDto, false);
    const createdUser = await this.userService.getUserById(createdUserId);
    if (!createdUser) return false;

    const emailConfirmationCode = new EmailConfirmationCodeService(
      tokenServiceCommands.create,
      { email: createdUser.email },
    );

    const isEmailSent = await this.emailService.sendEmailConfirmationEmail(
      createdUser,
      emailConfirmationCode.get(),
    );
    if (!isEmailSent) {
      await this.userService.delete(createdUser.id);
      return false;
    }
    return true;
  }

  async resendConfirmationCode(email: UserEmailDto) {
    const emailConfirmationCode = new EmailConfirmationCodeService();
    const user = await this.userService.getUserByLoginOrEmail(email.email);
    if (!user) return false;
    if (user.isConfirmed) return false;

    emailConfirmationCode.create(email);

    return await this.emailService.reSendEmailConfirmationEmail(
      user,
      emailConfirmationCode.get(),
    );
  }

  async confirmEmail(confirmationCode: UserConfirmationCodeDto) {
    const emailConfirmationCode = new EmailConfirmationCodeService();
    emailConfirmationCode.set(confirmationCode.code);

    if (!emailConfirmationCode.verify()) return false;

    const user = await this.userService.getUserByLoginOrEmail(
      emailConfirmationCode.decode().email,
    );

    if (!user) return false;
    if (user.isConfirmed) return false;

    return await this.userService.updateUserConfirmationStatus(user.id);
  }

  async loginUser(loginDto: UserLoginDto) {
    const user = await this.userService.getUserByLoginOrEmail(
      loginDto.loginOrEmail,
    );
    if (!user) return null;

    const isSuccess = await this.cryptAdapter.compareHash(
      loginDto.password,
      user.hash,
    );
    if (!isSuccess) return null;

    const deviceId = '100'; //uuidv4();
    const accessToken = new AccessTokenService();
    const refreshToken = new RefreshTokenService();
    accessToken.create({ userId: user._id.toString() });
    refreshToken.create({
      userId: user._id.toString(),
      deviceId: deviceId,
    });

    const tokens = {
      accessToken: accessToken.get(),
      refreshToken: refreshToken.get(),
    };

    // const sessionIsCreate = await this.securityService.createAuthSession(
    //   tokens.refreshToken,
    //   deviceTitle,
    //   ip,
    // );
    // if (!sessionIsCreate) return null;
    return tokens;
  }
}
