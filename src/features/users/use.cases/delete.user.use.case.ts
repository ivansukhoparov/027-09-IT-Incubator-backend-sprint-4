import { UsersRepository } from '../infrastructure/users.repository';
import { Injectable } from '@nestjs/common';
import { UserType } from '../types/output';
import { BcryptAdapter } from '../../../common/adapters/bcrypt.adapter';
import { UserCreateInputModel } from '../api/models/user.create.input.model';
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

export class DeleteUserCommand{
  constructor (public userId:string){}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase implements ICommandHandler<DeleteUserCommand>{
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(command: DeleteUserCommand) {
    await this.usersRepository.deleteUser(command.userId);
  }
}
