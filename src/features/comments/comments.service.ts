import { CommentsRepository } from './comments.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(protected userRepository: CommentsRepository) {}

  findUsers(term: string) {
    return this.userRepository.findUsers(term);
  }
}
