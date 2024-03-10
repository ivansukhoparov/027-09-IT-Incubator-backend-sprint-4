import { CommentsRepository } from '../infrastructure/comments.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(protected commentsRepository: CommentsRepository) {}
}
