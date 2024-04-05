import {
  UserConfirmationCodeDto,
  UserLoginDto,
  UserRegistrationDto,
} from '../types/input';
import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { UsersService } from '../../users/application/users.service';

import { EmailService } from '../../../common/email/email.service';
import { BcryptAdapter } from '../../../common/adapters/bcrypt.adapter';
import { EmailConfirmationCodeService } from '../../../common/token.services/email.confirmation.code.service';
import { AccessTokenService } from '../../../common/token.services/access.token.service';
import { RefreshTokenService } from '../../../common/token.services/refresh.token.service';
import { tokenServiceCommands } from '../../../common/token.services/utils/common';
import { UserCreateInputModel } from '../../users/api/models/user.create.input.model';
import {LoginInputModel, UserEmailDto} from '../api/models/login.input.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
    private readonly cryptAdapter: BcryptAdapter,
  ) {}

  async registerUser(registrationDto: UserCreateInputModel) {
    let user = await this.userService.getUserByLoginOrEmail(registrationDto.login)
    // TODO fix it - change to native Error
    if (user) throw new BadRequestException({errorsMessages:
          [{
            message: "invalid field",
            field: "login"
          }]
    })
    user = await this.userService.getUserByLoginOrEmail(registrationDto.email)
    // TODO fix it - change to native Error
    if (user) throw new BadRequestException({errorsMessages:
          [{
            message: "invalid field",
            field: "email"
          }]
    })

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

    const user = await this.userService.getUserByLoginOrEmail(email.email);
    // TODO fix it - change to native Error
    if (!user || user.isConfirmed) throw new BadRequestException({errorsMessages:
          [{
            message: "email exist",
            field: "email"
          }]
    })

    const emailConfirmationCode = new EmailConfirmationCodeService(
        tokenServiceCommands.create,
        { email: email.email },
    );


    return await this.emailService.reSendEmailConfirmationEmail(
      user,
      emailConfirmationCode.get(),
    );
  }

  async confirmEmail(confirmationCode: UserConfirmationCodeDto) {
    const emailConfirmationCode = new EmailConfirmationCodeService("set",confirmationCode.code);

// TODO fix it - change to native Error
    if (!emailConfirmationCode.verify()) throw new BadRequestException({errorsMessages:
      [{
        message: "email exist",
        field: "code"
      }]
    })

    const user = await this.userService.getUserByLoginOrEmail(
      emailConfirmationCode.decode().email,
    );


    // TODO fix it - change to native Error
    if (!user || user.isConfirmed) throw new BadRequestException({errorsMessages:
          [{
            message: "email exist",
            field: "code"
          }]
    })

    return await this.userService.updateUserConfirmationStatus(user.id);
  }

  async loginUser(loginDto: LoginInputModel) {
    const user = await this.userService.getUserByLoginOrEmail(
      loginDto.loginOrEmail,
    );
    if (!user) throw new HttpException("Bad login or password", HttpStatus.UNAUTHORIZED)

    const isSuccess = await this.cryptAdapter.compareHash(
      loginDto.password,
      user.hash,
    );
    if (!isSuccess) throw new HttpException("Bad login or password", HttpStatus.UNAUTHORIZED)

    const deviceId = '100'; //uuidv4();
    const accessToken = new AccessTokenService();
    const refreshToken = new RefreshTokenService();
    accessToken.create({ userId: user._id.toString() });
    refreshToken.create({
      userId: user._id.toString(),
      deviceId: deviceId,
    });

    // const sessionIsCreate = await this.securityService.createAuthSession(
    //   tokens.refreshToken,
    //   deviceTitle,
    //   ip,
    // );
    // if (!sessionIsCreate) return null;
    return { accessToken, refreshToken };
  }
}
