import { UserRegistrationDto } from '../types/input';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/application/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async registerUser(registrationDto: UserRegistrationDto) {
    const createdUserId = await this.userService.create(registrationDto);
    const createdUser = await this.userService.getUserById(createdUserId);
    if (!createdUser) return false;
    // const isEmailSent = await EmailAdapter.sendEmailConfirmationEmail(createdUser);
    // if (!isEmailSent) {
    //     await this.usersRepository.deleteUser(createdUser.id);
    //     return false;
    // }
    return true;
  }
}
