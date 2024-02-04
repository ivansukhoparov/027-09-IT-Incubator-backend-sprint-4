import { PostsRepository } from './posts.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(protected userRepository: PostsRepository) {}

  findUsers(term: string) {
    return this.userRepository.findUsers(term);
  }
}
