import { UsersRepository } from '../infrastructure/users.repository';
import { Injectable } from '@nestjs/common';
import { UserCreateInputModelType } from '../types/input';
import { UserType } from '../types/output';

@Injectable()
export class UsersService {
  constructor(protected usersRepository: UsersRepository) {}

  async create(
    inputModel: UserCreateInputModelType,
    isConfirmed: boolean = false,
  ) {
    const createdAt = new Date().toISOString();
    const hash = inputModel.password;

    const newUser: UserType = {
      login: inputModel.login,
      email: inputModel.email,
      hash: hash,
      createdAt: createdAt,
      isConfirmed: isConfirmed,
    };

    return await this.usersRepository.createUser(newUser);
  }

  async delete(id: string) {
    await this.usersRepository.deleteUser(id);
  }

  async getUserByLoginOrEmail(loginOrEmail: string) {
    return this.usersRepository.getUserByLoginOrEmail(loginOrEmail);
  }

  async getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }
}
