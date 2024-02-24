import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(protected userRepository: UsersRepository) {}

  findUsers(term: string) {
    return this.userRepository.findUsers(term);
  }
}
