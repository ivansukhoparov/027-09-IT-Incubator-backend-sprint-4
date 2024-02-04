import { BlogsRepository } from './blogs.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsService {
  constructor(protected userRepository: BlogsRepository) {}

  findUsers(term: string) {
    return this.userRepository.findUsers(term);
  }
}
