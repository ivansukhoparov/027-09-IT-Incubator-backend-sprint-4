import { UserRegistrationDto } from '../types/input';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/application/users.service';
import { EmailConfirmationCode } from '../../../common/email.confirmation.code';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly emailConfirmationCode: EmailConfirmationCode,
  ) {}

  async registerUser(registrationDto: UserRegistrationDto) {
    const createdUserId = await this.userService.create(registrationDto, false);
    const createdUser = await this.userService.getUserById(createdUserId);
    if (!createdUser) return false;
    const confirmationCode = this.emailConfirmationCode.create(
      createdUser.email,
    );

    // const isEmailSent = await EmailAdapter.sendEmailConfirmationEmail(createdUser);
    // if (!isEmailSent) {
    //     await this.usersRepository.deleteUser(createdUser.id);
    //     return false;
    // }
    return true;
  }
}
