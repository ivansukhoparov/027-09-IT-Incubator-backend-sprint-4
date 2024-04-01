import {
  UserConfirmationCodeDto,
  UserEmailDto,
  UserLoginDto,
  UserRegistrationDto,
} from '../types/input';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/application/users.service';
import { EmailConfirmationCode } from '../../../common/email.confirmation.code';
import { EmailService } from '../../../common/email/email.service';
import { BcryptAdapter } from '../../../common/adapters/bcrypt.adapter';
import { AccessToken } from '../../../common/access.token';
import { RefreshToken } from '../../../common/refresh.token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly emailConfirmationCode: EmailConfirmationCode,
    private readonly emailService: EmailService,
    private readonly cryptAdapter: BcryptAdapter,
    private readonly accessToken: AccessToken,
    private readonly refreshToken: RefreshToken,
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

    return await this.emailService.reSendEmailConfirmationEmail(
      user,
      this.emailConfirmationCode.get(),
    );
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

    this.accessToken.create({ userId: user._id.toString() });
    this.refreshToken.create({
      userId: user._id.toString(),
      deviceId: deviceId,
    });

    const tokens = {
      accessToken: this.accessToken.get(),
      refreshToken: this.refreshToken.get(),
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
