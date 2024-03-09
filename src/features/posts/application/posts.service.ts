import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../infrastructure/posts.repository';

@Injectable()
export class PostsService {
  constructor(protected userRepository: PostsRepository) {}

  findUsers(term: string) {
    return this.userRepository.findUsers(term);
  }
}
