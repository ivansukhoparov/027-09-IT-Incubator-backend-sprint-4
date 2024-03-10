import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comments } from './comments.schema';
import { commentMapper } from '../types/mapper';

@Injectable()
export class CommentsQueryRepository {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<Comments>,
  ) {}

  async getById(id: string) {
    const comment: CommentDocument = await this.commentModel.findById(id);
    if (!comment) throw new NotFoundException();
    return commentMapper(comment);
  }
}
